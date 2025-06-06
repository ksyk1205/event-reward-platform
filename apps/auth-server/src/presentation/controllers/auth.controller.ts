import {Controller, Post, Body, HttpException, HttpStatus, HttpCode} from '@nestjs/common';
import {AuthService} from '../../application/services/auth.service';
import {LoginRequestDto, LoginResponseDto} from "../dto/auth.dto";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: '로그인'})
    @ApiBody({type: LoginRequestDto})
    @ApiResponse({status: 201, description: '로그인 완료', type: LoginResponseDto})
    async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
        const {userId, password} = body;

        if (!userId || !password) {
            throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
        }

        const token = await this.authService.login(userId, password);


        return {
            statusCode: HttpStatus.OK,
            message: 'Login successful',
            refreshToken: token,
        };
    }
}
