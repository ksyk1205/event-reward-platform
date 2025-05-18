import { SetMetadata } from '@nestjs/common';

export enum Role {
    ADMIN = 'ADMIN',
    OPERATOR = 'OPERATOR',
    USER = 'USER',
    AUDITOR = 'AUDITOR',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);