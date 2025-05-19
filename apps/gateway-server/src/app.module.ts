import { Module } from '@nestjs/common';
import {ProxyService} from "./application/services/proxy.service";
import {HttpModule} from "@nestjs/axios";
import {JwtAuthGuard} from "./common/guards/jwt-auth.guard";
import {AuthProxyController} from "./presentation/controllers/auth-proxy.controller";
import {APP_GUARD} from "@nestjs/core";
import {EventProxyController} from "./presentation/controllers/event-proxy.controller";
import {UserProxyController} from "./presentation/controllers/user-proxy.controller";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {RolesGuard} from "./common/guards/roles.guard";
import {RewardRequestProxyController} from "./presentation/controllers/reward-request-proxy.controller";

@Module({
  imports: [HttpModule],
  controllers: [AuthProxyController,
    EventProxyController,
    UserProxyController,
    RewardRequestProxyController,
    AppController
  ],
  providers: [
    ProxyService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule {}

