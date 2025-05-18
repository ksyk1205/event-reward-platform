import {
    CanActivate,
    ExecutionContext,
    Injectable,
    HttpException,
    HttpStatus,
    UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {Role} from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        console.log(`[RolesGuard] Checking roles: ${JSON.stringify(roles)} for user role: ${user.role}`);

        if (!roles.includes(user.role)) {
            console.error(`[RolesGuard] Access denied. Required roles: ${roles} - User role: ${user.role}`);
            throw new UnauthorizedException('Forbidden');
        }

        console.log(`[RolesGuard] Access granted`);
        return true;
    }
}
