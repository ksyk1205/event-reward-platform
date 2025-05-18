import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthenticatedUser {
    id: string;
    userid: string;
    role: string;
}

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
        const request = ctx.switchToHttp().getRequest();
        return {
            id: request.headers['x-id'],
            userid: request.headers['x-user-id'],
            role: request.headers['x-user-role'],
        };
    },
);
