import {IsNotEmpty, IsString} from "class-validator";

export class LoginRequestDto {
    @IsString()
    @IsNotEmpty({ message: 'userid is required' })
    userId: string;
    @IsString()
    @IsNotEmpty({ message: 'password is required' })
    password: string;
}

export class LoginResponseDto {
    statusCode: number;
    message: string;
    refreshToken: string;
}