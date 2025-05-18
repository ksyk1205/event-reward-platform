import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import {Role, Roles} from 'src/common/decorators/roles.decorator';
import {ProxyService} from "../../application/services/proxy.service";

@Controller('events/:eventId/rewards/:rewardId/request')
@UseGuards(JwtAuthGuard)
export class EventRewardRequestProxyController {
    constructor(private readonly proxyService: ProxyService) {}

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
    async getRequestById(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Patch(':requestId/status')
    @Roles(Role.OPERATOR, Role.ADMIN)
    async updateRequestStatus(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    // 공통 Proxy 호출 처리
    private async forwardRequest(req: Request, res: Response, user?: any) {
        try {
            console.log(`[EventProxy] Forwarding request: ${req.path}`);
            const result = await this.proxyService.forwardRequest(req.path, req.method, req.body, req.headers, user);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
