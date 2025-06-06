import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginRequestDto {
    @IsString()
    @IsNotEmpty({ message: 'userid is required' })
    @ApiProperty({ example: 'admin', description: '사용자 아이디' })
    userId: string;
    @IsString()
    @IsNotEmpty({ message: 'password is required' })
    @ApiProperty({ example: 'testest1234', description: '사용자 비밀번호' })
    password: string;
}

export class LoginResponseDto {
    @ApiProperty({ example: '201', description: '상태' })
    statusCode: number;
    @ApiProperty({ example: 'Login successful', description: '로그인 성공 메시지' })
    message: string;
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: '토큰' })
    refreshToken: string;
}