import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {EventModule} from './application/modules/event.module';
import {RewardModule} from "./application/modules/reward.module";
import {RewardRequestModule} from "./application/modules/reward-request.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    EventModule,
    RewardModule,
    RewardRequestModule,
  ],
})
export class AppModule {}
