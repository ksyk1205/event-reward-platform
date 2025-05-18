import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardRequest, RewardRequestSchema } from '../../infrastructure/schemas/reward-request.schema';
import { RewardRequestRepository } from '../../infrastructure/repositories/reward-request.repository';
import { EventRewardRequestService } from '../services/event-reward-request.service';
import { EventRewardRequestController } from '../../presentation/controllers/event-reward-request.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: RewardRequest.name, schema: RewardRequestSchema }])
    ],
    controllers: [EventRewardRequestController],
    providers: [RewardRequestRepository, EventRewardRequestService],
    exports: [EventRewardRequestService]
})
export class RewardRequestModule {}
