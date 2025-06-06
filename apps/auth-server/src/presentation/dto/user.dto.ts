import {IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Role} from "../../common/enums/roles.enum";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateRequestDto {
    @IsString()
    @IsNotEmpty({ message: 'User ID is required' })
    @ApiProperty({ example: 'admin', description: '사용자 아이디' })
    userId: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @ApiProperty({ example: 'testest1234', description: '비밓번' })
    password: string;

    @IsEnum(Role, { message: 'Invalid role type' })
    @ApiProperty({ example: 'ADMIN', description: '권한' })
    role: Role;
}

export class UpdateRequestDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ example: 'admin', description: '사용자 아이디' })
    userId?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ example: 'testtest1234', description: '비밀번호' })
    password?: string;

    @IsEnum(Role)
    @IsOptional()
    @ApiPropertyOptional({
        enum: Role,
        description: '사용자 역할',
        example: Role.USER,
    })
    role?: Role;
}

export class UserResponseDto {
    @ApiProperty({ example: '68287d9c0f74efc5a62161e2', description: 'DB에 저장된 고유 ID' })
    id: string;

    @ApiProperty({ example: 'admin', description: '사용자 ID' })
    userId: string;

    @ApiProperty({ enum: Role, example: Role.USER, description: '사용자 역할' })
    role: Role;

    @ApiProperty({ example: '2025-06-05T12:34:56.000Z', description: '마지막 로그인 시각' })
    lastLoginAt: Date;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}
