import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {ProxyService} from "../../application/services/proxy.service";
import {Public} from "../../common/decorators/public.decorator";

@Controller('auth')
export class AuthProxyController {
    constructor(private readonly proxyService: ProxyService) {
    }
    @Public()
    @All('/*')
    async handleRequest(@Req() req: Request, @Res() res: Response) {
        try {
            const result = await this.proxyService.forwardRequest(req.path, req.method, req.body, req.headers);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
