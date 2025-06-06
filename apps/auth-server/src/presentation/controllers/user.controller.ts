import {
    Controller,
    Post,
    Body,
    Patch,
    Delete,
    Param,
    HttpException,
    HttpStatus,
    Get,
    HttpCode,
} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, getSchemaPath, ApiExtraModels} from '@nestjs/swagger';
import { UserService } from '../../application/services/user.service';
import {
    CreateRequestDto,
    UpdateRequestDto,
    UserResponseDto,
} from '../dto/user.dto';
import { ResponseDto } from '../../common/dto/response.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '모든 사용자 조회' })
    @ApiExtraModels(UserResponseDto)
    @ApiResponse({
        status: 200,
        description: '사용자 목록을 성공적으로 반환함',
        schema: {
            type: 'array',
            items: { $ref: getSchemaPath(UserResponseDto) },
        },
    })
    async findAll(): Promise<ResponseDto<UserResponseDto[]>> {
        const users = await this.userService.findAll();
        return new ResponseDto(users, { totalCount: users.length });
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: '사용자 생성' })
    @ApiBody({ type: CreateRequestDto })
    @ApiResponse({ status: 201, description: '사용자 생성 완료' })
    async create(@Body() body: CreateRequestDto): Promise<void> {
        await this.userService.create(body);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: '사용자 정보 수정' })
    @ApiParam({ name: 'id', description: 'ID' })
    @ApiBody({ type: UpdateRequestDto })
    @ApiResponse({ status: 201, description: '사용자 수정 완료' })
    @ApiResponse({ status: 404, description: '사용자를 찾을 수 없음' })
    async update(@Param('id') id: string, @Body() updateData: UpdateRequestDto) {
        const user = await this.userService.update(id, updateData);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return { message: 'User updated successfully', user };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: '사용자 삭제' })
    @ApiParam({ name: 'id', description: 'ID' })
    @ApiResponse({ status: 204, description: '사용자 삭제 완료' })
    async delete(@Param('id') id: string) {
        await this.userService.delete(id);
        return { message: 'User deleted successfully' };
    }
}
