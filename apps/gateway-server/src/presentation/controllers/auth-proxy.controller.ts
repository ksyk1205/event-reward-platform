import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {Public} from "../../common/decorators/public.decorator";
import {BaseProxyController} from "./base-proxy.controller";
import {ProxyService} from "../../application/services/proxy.service";

@Controller('auth')
export class AuthProxyController extends BaseProxyController {
    constructor(proxyService: ProxyService) {
        super(proxyService);
    }
    @Public()
    @All('/*')
    async handleRequest(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }
}
