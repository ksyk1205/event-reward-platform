import {BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UserService} from "./user.service";
import {User} from "../../infrastructure/schemas/user.schema";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    generateToken(user: User): string {
        const payload = { id: user._id, userid: user.userId, role: user.role };
        return this.jwtService.sign(payload);
    }

    async login(userId: string, password: string): Promise<string> {
        const user = await this.userService.findOne(userId);

        if (!user) {
            throw new BadRequestException('User not found');
        }

        if (user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        user.lastLoginAt = new Date();
        await user.save();

        return this.generateToken(user);
    }
}
