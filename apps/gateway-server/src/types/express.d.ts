import { Role } from 'src/common/decorators/roles.decorator';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                userid: string;
                role: Role;
            }
        }
    }
}
