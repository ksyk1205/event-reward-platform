import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardController } from '../../presentation/controllers/reward.controller';
import { RewardService } from '../../application/services/reward.service';
import { Reward, RewardSchema } from '../../infrastructure/schemas/reward.schema';
import { RewardRepository } from '../../infrastructure/repositories/reward.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
    ],
    controllers: [RewardController],
    providers: [RewardService, RewardRepository],
    exports: [RewardService, RewardRepository],
})
export class RewardModule {}
