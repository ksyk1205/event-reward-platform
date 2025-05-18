import { Controller, Post, Body, Patch, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import {UserService} from "../../application/services/user.service";
import {CreateRequestDto, UpdateRequestDto} from "../dto/user.dto";


@Controller('users')
export class UserController {
    constructor(
        private readonly userService:UserService
    ) {}

    @Post()
    async register(@Body() body: CreateRequestDto) {
        await this.userService.create(body);
        return { message: 'User registered successfully' };
    }

    @Patch(':userid')
    async updateUser(@Param('userid') userid: string, @Body() updateData: UpdateRequestDto) {
        const user = await this.userService.update(userid, updateData);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'User updated successfully', user };
    }

    @Delete(':userid')
    async deleteUser(@Param('userid') userid: string) {
        await this.userService.delete(userid);
        return { message: 'User deleted successfully' };
    }
}