import { Injectable, NotFoundException } from '@nestjs/common';
import { EventRewardRepository } from '../../infrastructure/repositories/event-reward.repository';
import {CreateEventRewardRequestDto, EventRewardResponseDto, UpdateEventRewardRequestDto} from "../../presentation/dto/event-reward.dto";
import {AuthenticatedUser} from "../../common/decorators/user.decorator";

@Injectable()
export class EventRewardService {
    constructor(private readonly eventRewardRepository: EventRewardRepository) {}

    async create(user: AuthenticatedUser, eventId: string, rewardData: CreateEventRewardRequestDto): Promise<void> {
        await this.eventRewardRepository.create({
            eventId,
            ...rewardData,
            createdBy: user.userId
        });
    }

    async findAll(eventId: string): Promise<EventRewardResponseDto[]> {
        const rewards = await this.eventRewardRepository.findAll(eventId);
        return rewards.map(reward => new EventRewardResponseDto({
            id: reward.id,
            eventId: reward.eventId,
            description: reward.description,
            type: reward.type,
            quantity: reward.quantity,
        }));
    }

    async findById(eventId: string, rewardId: string): Promise<EventRewardResponseDto> {
        const reward = await this.eventRewardRepository.findOne(eventId, rewardId);
        if (!reward) {
            throw new NotFoundException(`Reward with ID ${rewardId} not found.`);
        }
        return new EventRewardResponseDto({
            id: reward.id,
            eventId: reward.eventId,
            description: reward.description,
            type: reward.type,
            quantity: reward.quantity,
        });
    }

    async update(user: AuthenticatedUser, eventId: string, rewardId: string, updateData: UpdateEventRewardRequestDto): Promise<EventRewardResponseDto> {
        const reward = await this.eventRewardRepository.update(eventId, rewardId, {...updateData, updatedBy: user.userId});
        if (!reward) {
            throw new NotFoundException(`Reward with ID ${rewardId} not found.`);
        }
        return new EventRewardResponseDto({
            id: reward.id,
            eventId: reward.eventId,
            description: reward.description,
            type: reward.type,
            quantity: reward.quantity,
        });
    }

    async delete(eventId: string, rewardId: string): Promise<void> {
        const result = await this.eventRewardRepository.delete(eventId, rewardId);
        if (!result) {
            throw new NotFoundException(`Reward with ID ${rewardId} not found.`);
        }
    }
}
