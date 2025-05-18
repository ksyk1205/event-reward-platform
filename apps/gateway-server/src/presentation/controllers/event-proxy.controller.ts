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

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventProxyController {
    constructor(private readonly proxyService: ProxyService) {}

    @Post()
    @Roles(Role.OPERATOR, Role.ADMIN)
    async createEvent(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res, req.user);
    }

    @Get()
    @Roles(Role.USER, Role.OPERATOR, Role.ADMIN)
    async getEvents(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Get(':id')
    @Roles(Role.USER, Role.OPERATOR, Role.ADMIN)
    async getEventById(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Patch(':id')
    @Roles(Role.OPERATOR, Role.ADMIN)
    async updateEvent(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    async deleteEvent(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Post(':eventId/rewards')
    @Roles(Role.OPERATOR, Role.ADMIN)
    async createReward(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Get(':eventId/rewards')
    @Roles(Role.USER, Role.OPERATOR, Role.ADMIN)
    async getRewards(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Get(':eventId/rewards/:id')
    @Roles(Role.USER, Role.OPERATOR, Role.ADMIN)
    async getRewardById(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Patch(':eventId/rewards/:id')
    @Roles(Role.OPERATOR, Role.ADMIN)
    async updateReward(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Delete(':eventId/rewards/:id')
    @Roles(Role.ADMIN)
    async deleteReward(@Req() req: Request, @Res() res: Response) {
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
