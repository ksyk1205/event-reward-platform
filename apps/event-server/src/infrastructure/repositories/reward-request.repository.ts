import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {RewardRequest} from '../schemas/reward-request.schema';
import {RewardRequestStatus} from "../../common/enums/reward-request-status.enum";
import {UpdateRewardStatusRequestDto} from "../../presentation/dto/event-reward-request.dto";

@Injectable()
export class RewardRequestRepository {
    constructor(@InjectModel(RewardRequest.name) private rewardRequestModel: Model<RewardRequest>) {
    }

    async save(userId: string, eventId: string, rewardId: string): Promise<RewardRequest> {
        const create = {
            userId: userId,
            eventId: eventId,
            rewardId: rewardId,
            status: RewardRequestStatus.PENDING,
            requestDate: new Date(),
        }

        return new this.rewardRequestModel(create).save();
    }

    async findByEventAndReward(eventId: string, rewardId: string): Promise<RewardRequest[]> {
        return this.rewardRequestModel.find({eventId, rewardId}).exec();
    }

    async findByIdAndEventAndReward(id: string, eventId: string, rewardId: string): Promise<RewardRequest | null> {
        return this.rewardRequestModel.findOne({id, eventId, rewardId}).exec();
    }

    async findByMe(userId:string): Promise<RewardRequest | null> {
        return this.rewardRequestModel.findOne({userId}).exec();
    }

    async findAll(): Promise<RewardRequest[]> {
        return this.rewardRequestModel.find().exec();
    }


    async updateByEventAndReward(
        requestId: string,
        eventId: string,
        rewardId: string,
        updateData: UpdateRewardStatusRequestDto
    ): Promise<void> {
        await this.rewardRequestModel.findOneAndUpdate(
            {
                _id: requestId,
                eventId: eventId,
                rewardId: rewardId
            },
            updateData,
            { new: true }
        ).exec();
    }

}
