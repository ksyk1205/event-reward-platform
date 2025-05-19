import {Controller, Post, Body, HttpException, HttpStatus, HttpCode} from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import {LoginRequestDto, LoginResponseDto} from "../dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.CREATED)
    async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
        const { userId, password } = body;

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
