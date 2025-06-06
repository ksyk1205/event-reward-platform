import { Request, Response } from 'express';
import { ProxyService } from '../../application/services/proxy.service';

export abstract class BaseProxyController {
    constructor(private readonly proxyService: ProxyService) {}

    protected async forwardRequest(req: Request, res: Response, user?: any) {
        try {
            console.log(`[BaseProxy] Forwarding request: ${req.method} ${req.originalUrl}`);

            const result = await this.proxyService.forwardRequest(
                req.originalUrl,
                req.method,
                req.body,
                req.headers,
                user,
            );

            const { status, headers, data } = result;
            res.set(headers);
            const contentType = headers['content-type'] || '';

            if (contentType.includes('application/json')) {
                res.status(status).json(data);
            } else {
                res.status(status).send(data);
            }
        } catch (error) {
            if (error.response) {
                console.error(`[BaseProxy] Error from proxy target: ${error.response.status} - ${error.response.data}`);

                const status = error.response.status || 500;
                const message = error.response.data?.message || error.message || 'Internal Server Error';

                res.status(Number.isInteger(status) ? status : 500).json({
                    statusCode: status,
                    message,
                    error: error.response.data?.error || 'Proxy Error',
                    path: req.path,
                    timestamp: new Date().toISOString(),
                });
            } else {
                console.error(`[BaseProxy] Unexpected Error: ${error.message}`);
                res.status(500).json({
                    statusCode: 500,
                    message: 'Internal Server Error',
                    error: error.message,
                    path: req.path,
                    timestamp: new Date().toISOString(),
                });
            }
        }
    }
}
