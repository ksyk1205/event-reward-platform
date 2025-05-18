import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import {LoginRequestDto, LoginResponseDto} from "../dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
        const { userid, password } = body;

        if (!userid || !password) {
            throw new HttpException('Username and password are required', HttpStatus.BAD_REQUEST);
        }

        const token = await this.authService.login(userid, password);

        return {
            statusCode: HttpStatus.OK,
            message: 'Login successful',
            accessToken: token,
        };
    }
}
