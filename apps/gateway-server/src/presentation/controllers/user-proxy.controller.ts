import {Controller, Post, Patch, Delete, Req, Res, UseGuards, Get, Param} from '@nestjs/common';
import {Request, Response} from 'express';
import {JwtAuthGuard} from 'src/common/guards/jwt-auth.guard';
import {Role, Roles} from "../../common/decorators/roles.decorator";
import {BaseProxyController} from "./base-proxy.controller";
import {ProxyService} from "../../application/services/proxy.service";

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserProxyController extends BaseProxyController {
    constructor(proxyService: ProxyService) {
        super(proxyService);
    }

    @Get()
    @Roles(Role.ADMIN)
    async findAllUser(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Post()
    @Roles(Role.ADMIN)
    async createUser(@Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Patch(':id')
    @Roles(Role.ADMIN)
    async updateUser(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    async deleteUser(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
        await this.forwardRequest(req, res);
    }
}
