import { Controller, Post, Patch, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import {ProxyService} from "../../application/services/proxy.service";
import {Role, Roles} from "../../common/decorators/roles.decorator";

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserProxyController {
    constructor(private readonly proxyService: ProxyService) {}

    @Post()
    @Roles(Role.ADMIN)
    async createUser(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Patch()
    @Roles(Role.ADMIN)
    async updateUser(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Delete()
    @Roles(Role.ADMIN)
    async deleteUser(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    private async forwardRequest(req: Request, res: Response) {
        try {
            console.log(`[UserProxy] Forwarding request: ${req.path}`);
            const result = await this.proxyService.forwardRequest(req.path, req.method, req.body, req.headers);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
