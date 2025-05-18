import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/presentation/controllers/user.controller';
import { UserService } from '../services/user.service';
import {User, UserSchema} from "../../infrastructure/schemas/user.schema";
import {UserRepository} from "../../infrastructure/repositories/user.repository";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [
        UserRepository,
        UserService,
    ],
    exports: [
        UserService,
        UserRepository,
    ],
})
export class UserModule {}
