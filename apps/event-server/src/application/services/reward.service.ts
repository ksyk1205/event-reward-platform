import { Injectable, NotFoundException } from '@nestjs/common';
import { RewardRepository } from '../../infrastructure/repositories/reward.repository';
import {CreateRewardRequestDto, RewardResponseDto, UpdateRewardRequestDto} from "../../presentation/dto/reward.dto";
import {AuthenticatedUser} from "../../common/decorators/user.decorator";

@Injectable()
export class RewardService {
    constructor(private readonly rewardRepository: RewardRepository) {}

    async create(user: AuthenticatedUser, eventId: string, rewardData: CreateRewardRequestDto): Promise<void> {
        await this.rewardRepository.create({
            eventId,
            ...rewardData,
            createdBy: user.userid
        });
    }

    async findAll(eventId: string): Promise<RewardResponseDto[]> {
        const rewards = await this.rewardRepository.findAll(eventId);
        return rewards.map(reward => new RewardResponseDto({
            id: reward.id,
            eventId: reward.eventId,
            description: reward.description,
            type: reward.type,
            quantity: reward.quantity,
        }));
    }

    async findById(eventId: string, rewardId: string): Promise<RewardResponseDto> {
        const reward = await this.rewardRepository.findOne(eventId, rewardId);
        if (!reward) {
            throw new NotFoundException(`Reward with ID ${rewardId} not found.`);
        }
        return new RewardResponseDto({
            id: reward.id,
            eventId: reward.eventId,
            description: reward.description,
            type: reward.type,
            quantity: reward.quantity,
        });
    }

    async update(user: AuthenticatedUser, eventId: string, rewardId: string, updateData: UpdateRewardRequestDto): Promise<RewardResponseDto> {
        const reward = await this.rewardRepository.update(eventId, rewardId, {...updateData, updatedBy: user.userid});
        if (!reward) {
            throw new NotFoundException(`Reward with ID ${rewardId} not found.`);
        }
        return new RewardResponseDto({
            id: reward.id,
            eventId: reward.eventId,
            description: reward.description,
            type: reward.type,
            quantity: reward.quantity,
        });
    }

    async delete(eventId: string, rewardId: string): Promise<void> {
        const result = await this.rewardRepository.delete(eventId, rewardId);
        if (!result) {
            throw new NotFoundException(`Reward with ID ${rewardId} not found.`);
        }
    }
}
