import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward } from '../../infrastructure/schemas/reward.schema';

@Injectable()
export class EventRewardRepository {
    constructor(@InjectModel(Reward.name) private readonly rewardModel: Model<Reward>) {}

    async create(rewardData: Partial<Reward>): Promise<Reward> {
        const createdReward = new this.rewardModel(rewardData);
        return createdReward.save();
    }

    async findAll(eventId: string): Promise<Reward[]> {
        return this.rewardModel.find({ eventId }).exec();
    }

    async findOne(eventId: string, rewardId: string): Promise<Reward | null> {
        return this.rewardModel.findOne({ eventId, _id: rewardId }).exec();
    }

    async update(eventId: string, rewardId: string, updateData: Partial<Reward>): Promise<Reward | null> {
        return this.rewardModel.findOneAndUpdate({ eventId, _id: rewardId }, updateData, { new: true }).exec();
    }

    async delete(eventId: string, rewardId: string): Promise<boolean> {
        const result = await this.rewardModel.deleteOne({ eventId, _id: rewardId }).exec();
        return result.deletedCount > 0;
    }
}
