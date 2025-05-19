import {Controller, Post, Body, Patch, Delete, Param, HttpException, HttpStatus, Get, HttpCode} from '@nestjs/common';
import {UserService} from "../../application/services/user.service";
import {CreateRequestDto, UpdateRequestDto, UserResponseDto} from "../dto/user.dto";
import {ResponseDto} from "../../common/dto/response.dto";


@Controller('users')
export class UserController {
    constructor(
        private readonly userService:UserService
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() :Promise<ResponseDto<UserResponseDto[]>>{
        const users = await this.userService.findAll();
        return new ResponseDto(users, {totalCount: users.length});
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() body: CreateRequestDto):Promise<void> {
        await this.userService.create(body);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@Param('id') id: string, @Body() updateData: UpdateRequestDto) {
        const user = await this.userService.update(id, updateData);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'User updated successfully', user };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: string) {
        await this.userService.delete(id);
        return { message: 'User deleted successfully' };
    }
}