import {Injectable, NotFoundException} from '@nestjs/common';
import {RewardRequestRepository} from '../../infrastructure/repositories/reward-request.repository';
import {RewardRequest} from '../../infrastructure/schemas/reward-request.schema';
import {AuthenticatedUser} from "../../common/decorators/user.decorator";
import {UpdateRewardStatusRequestDto} from "../../presentation/dto/event-reward-request.dto";

@Injectable()
export class EventRewardRequestService {
    constructor(private readonly rewardRequestRepository: RewardRequestRepository) {
    }

    async create(user: AuthenticatedUser, eventId: string, rewardId: string): Promise<RewardRequest> {
        return await this.rewardRequestRepository.save(user.id, eventId, rewardId);
    }

    async findAll(eventId: string, rewardId: string) {
        return await this.rewardRequestRepository.findByEventAndReward(eventId, rewardId);
    }

    async findById(eventId: string, rewardId: string, requestId: string): Promise<RewardRequest> {
        const rewardRequest = await this.rewardRequestRepository.findByIdAndEventAndReward(requestId, eventId, rewardId);
        if (!rewardRequest) {
            throw new NotFoundException(`RewardRequest with ID ${rewardId} not found.`);
        }
        return rewardRequest;
    }

    async update(eventId: string, rewardId: string, requestId: string, updateDto: UpdateRewardStatusRequestDto): Promise<void> {
        await this.rewardRequestRepository.updateByEventAndReward(eventId, rewardId, requestId, updateDto);
    }
}
