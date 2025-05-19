import { Request, Response } from 'express';
import {ProxyService} from "../../application/services/proxy.service";

export abstract class BaseProxyController {
    constructor(private readonly proxyService: ProxyService) {}

    protected async forwardRequest(req: Request, res: Response, user?: any) {
        try {
            console.log(`[BaseProxy] Forwarding request: ${req.path}`);

            const result = await this.proxyService.forwardRequest(
                req.path,
                req.method,
                req.body,
                req.headers,
                user,
            );

            res.status(200).json(result);
        } catch (error) {
            if (error.response) {
                // Proxy 서버에서 응답이 떨어졌지만 실패한 경우
                console.error(`[BaseProxy] Error from proxy target: ${error.response.status} - ${error.response.data}`);
                console.error(`[BaseProxy] Error from proxy target: ${error}`);

                const status = error.response.status || 500;
                const message = error.response.data?.message || error.message || 'Internal Server Error';

                res.status(Number.isInteger(status) ? status : 500).json({
                    statusCode: status,
                    message: message,
                    error: error.response.data?.error || 'Proxy Error',
                    path: req.path,
                    timestamp: new Date().toISOString()
                });
            } else {
                // 그 외 네트워크 에러나 기타 예외
                console.error(`[BaseProxy] Unexpected Error: ${error.message}`);

                res.status(500).json({
                    statusCode: 500,
                    message: 'Internal Server Error',
                    error: error.message,
                    path: req.path,
                    timestamp: new Date().toISOString()
                });
            }
        }
    }
}
