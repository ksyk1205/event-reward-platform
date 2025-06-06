import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Public } from '../../common/decorators/public.decorator';

@Controller('api-docs')
export class DocsProxyController {
    constructor(private readonly httpService: HttpService) {}

    @All('*')
    @Public()
    async proxySwagger(@Req() req: Request, @Res() res: Response) {
        let targetUrl = '';

        // 요청 URL: /api-docs/user/...
        if (req.originalUrl.startsWith('/api-docs/user')) {
            targetUrl = `http://auth-server:3001${req.originalUrl}`;
        }
        // 요청 URL: /api-docs/event/...
        else if (req.originalUrl.startsWith('/api-docs/event')) {
            targetUrl = `http://event-server:3002${req.originalUrl}`;
        } else {
            return res.status(404).send('Not Found');
        }

        try {
            const response = await lastValueFrom(
                this.httpService.request({
                    method: req.method,
                    url: targetUrl,
                    headers: req.headers,
                    responseType: 'arraybuffer',
                    validateStatus: (status) => status < 400 || status === 304, // ✅ 304 허용
                }),
            );

            res.status(response.status);
            if (response.status === 304) {
                return res.send(); // ✅ 304는 body 없이 응답
            }

            // ✅ content-type 헤더 세팅 (HTML, CSS, JS 등 처리)
            if (response.headers['content-type']) {
                res.setHeader('Content-Type', response.headers['content-type']);
            }

            res.send(response.data);
        } catch (error) {
            console.error('[Swagger Proxy Error]', error.message);
            res.status(502).send('Swagger proxy error');
        }
    }
}
