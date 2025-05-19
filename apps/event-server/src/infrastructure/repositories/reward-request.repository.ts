import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';
import {RewardRequest} from '../schemas/reward-request.schema';
import {RewardRequestStatus} from "../../common/enums/reward-request-status.enum";
import {
    CreateRewardRequestDto,
    RewardRequestFilterDto,
    UpdateRewardStatusRequestDto
} from "../../presentation/dto/reward-request.dto";

@Injectable()
export class RewardRequestRepository {
    constructor(@InjectModel(RewardRequest.name) private rewardRequestModel: Model<RewardRequest>) {
    }

    async save(userId: string, createDto: CreateRewardRequestDto, status: RewardRequestStatus): Promise<RewardRequest> {
        const create = {
            userId: userId,
            eventId: createDto.eventId,
            rewardId: createDto.rewardId,
            status: status,
            requestDate: new Date(),
        }

        return new this.rewardRequestModel(create).save();
    }

    async findById(id: string): Promise<RewardRequest | null> {
        return this.rewardRequestModel.findById(id).exec();
    }

    async findByUserId(userId: string): Promise<RewardRequest[]> {
        console.log(`Type of userId: ${typeof userId}`);
        if (mongoose.isValidObjectId(userId)) {
            console.log("userId is a valid ObjectId, converting for query...");
            userId = new mongoose.Types.ObjectId(userId).toString();
        }
        const result = await this.rewardRequestModel.find({userId}).exec();
        return result;
    }

    async findByUserEventAndReward(userId: string, eventId: string, rewardId: string): Promise<RewardRequest | null> {
        return this.rewardRequestModel.findOne({
            userId: userId,
            eventId: eventId,
            rewardId: rewardId
        }).exec();
    }


    async findAll(filter: RewardRequestFilterDto): Promise<RewardRequest[]> {
        return this.rewardRequestModel.find(filter).exec();
    }


    async update(
        requestId: string,
        updateData: UpdateRewardStatusRequestDto
    ): Promise<void> {
        await this.rewardRequestModel.findOneAndUpdate(
            {
                _id: requestId,
            },
            updateData,
            {new: true}
        ).exec();
    }

}
