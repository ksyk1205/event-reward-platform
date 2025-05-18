import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventRewardController } from '../../presentation/controllers/event-reward.controller';
import { EventRewardService } from '../services/event-reward.service';
import { Reward, RewardSchema } from '../../infrastructure/schemas/reward.schema';
import { EventRewardRepository } from '../../infrastructure/repositories/event-reward.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
    ],
    controllers: [EventRewardController],
    providers: [EventRewardService, EventRewardRepository],
    exports: [EventRewardService, EventRewardRepository],
})
export class RewardModule {}
