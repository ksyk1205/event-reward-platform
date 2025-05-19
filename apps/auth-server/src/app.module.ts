import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from "./infrastructure/schemas/user.schema";
import {JwtModule} from "@nestjs/jwt";
import {AuthController} from "./presentation/controllers/auth.controller";
import {UserController} from "./presentation/controllers/user.controller";
import {UserRepository} from "./infrastructure/repositories/user.repository";
import {UserService} from "./application/services/user.service";
import {AuthService} from "./application/services/auth.service";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AuthController,
    UserController
  ],
  providers: [
    UserRepository,
    UserService,
    AuthService
  ],
  exports: [
    UserService,
    AuthService,
    UserRepository
  ],
})
export class AppModule {}


