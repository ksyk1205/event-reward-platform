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
        const payload = { id: user._id, userid: user.userid, role: user.role };
        return this.jwtService.sign(payload);
    }

    async validateUser(userid: string, password: string): Promise<User | null> {
        const user = await this.userService.findOne(userid);

        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async login(userid: string, password: string): Promise<string> {
        const user = await this.userService.findOne(userid);

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
