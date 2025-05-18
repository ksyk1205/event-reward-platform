import {IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Role} from "../../common/enums/roles.enum";

export class CreateRequestDto {
    @IsString()
    @IsNotEmpty({ message: 'User ID is required' })
    userid: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsEnum(Role, { message: 'Invalid role type' })
    role: Role;
}

export class UpdateRequestDto {
    @IsString()
    @IsOptional()
    userid?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
