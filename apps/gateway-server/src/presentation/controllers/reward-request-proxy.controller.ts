import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import {Request, Response} from 'express';
import {JwtAuthGuard} from 'src/common/guards/jwt-auth.guard';
import {Role, Roles} from 'src/common/decorators/roles.decorator';
import {BaseProxyController} from "./base-proxy.controller";
import {ProxyService} from "../../application/services/proxy.service";

@Controller('rewards/request')
@UseGuards(JwtAuthGuard)
export class RewardRequestProxyController extends BaseProxyController {

    constructor(proxyService: ProxyService) {
        super(proxyService);
    }

    @Post()
    @Roles(Role.USER, Role.OPERATOR, Role.ADMIN)
    async createRequest(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res, req.user);
    }

    @Get()
    @Roles(Role.AUDITOR, Role.OPERATOR, Role.ADMIN)
    async getRequest(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Get(':requestId')
    @Roles(Role.AUDITOR, Role.OPERATOR, Role.ADMIN)
    async getRequestById(@Param('requestId') id: string, @Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Patch(':requestId/status')
    @Roles(Role.OPERATOR, Role.ADMIN)
    async updateRequestStatus(@Param('requestId') id: string, @Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Get('me')
    @Roles(Role.USER, Role.AUDITOR, Role.OPERATOR, Role.ADMIN)
    async getRequestMe(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }
}
