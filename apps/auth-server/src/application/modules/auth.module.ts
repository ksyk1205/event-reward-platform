import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AuthController } from 'src/presentation/controllers/auth.controller';
import {UserRepository} from "../../infrastructure/repositories/user.repository";
import {UserModule} from "./user.module";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: 'your-secret-key',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        UserRepository,
        UserService,
        AuthService,
    ],
    exports: [AuthService, UserService],
})
export class AuthModule {}