import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {EventModule} from './application/modules/event.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    EventModule,
    // RewardModule,
  ],
})
export class AppModule {}
