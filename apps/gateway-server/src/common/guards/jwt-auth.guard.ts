import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import {IS_PUBLIC_KEY} from "../decorators/public.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            console.log(`[JwtAuthGuard] 🚀 Public Route: Access allowed without authentication`);
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
        }

        try {
            console.log(`[JwtAuthGuard] Verifying token: ${token}`);
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my-secret-key');
            console.log(`[JwtAuthGuard] Token verified successfully. Payload:`, decoded);

            request.user = decoded;
            return true;
        } catch (err) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}
