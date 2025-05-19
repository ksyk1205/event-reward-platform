import {IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Role} from "../../common/enums/roles.enum";

export class CreateRequestDto {
    @IsString()
    @IsNotEmpty({ message: 'User ID is required' })
    userId: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsEnum(Role, { message: 'Invalid role type' })
    role: Role;
}

export class UpdateRequestDto {
    @IsString()
    @IsOptional()
    userId?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}

export class UserResponseDto {
    id: string;
    userId: string;
    role: Role;
    lastLoginAt: Date;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}
