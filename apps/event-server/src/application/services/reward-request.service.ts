import {BadRequestException, forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {RewardRequestRepository} from '../../infrastructure/repositories/reward-request.repository';
import {AuthenticatedUser} from "../../common/decorators/user.decorator";
import {
    CreateRewardRequestDto,
    RewardRequestFilterDto, RewardRequestResponseDto,
    UpdateRewardStatusRequestDto
} from "../../presentation/dto/reward-request.dto";
import {EventRepository} from "../../infrastructure/repositories/event.repository";
import {RewardRequestStatus} from "../../common/enums/reward-request-status.enum";

@Injectable()
export class RewardRequestService {
    constructor(private readonly rewardRequestRepository: RewardRequestRepository,
                @Inject(forwardRef(() => EventRepository))
                private readonly eventRepository: EventRepository) {
    }

    async create(user: AuthenticatedUser, createDto: CreateRewardRequestDto) {
        const event = await this.eventRepository.findOne(createDto.rewardId);

        const existingRequest = await this.rewardRequestRepository.findByUserEventAndReward(
            user.id,
            createDto.eventId,
            createDto.rewardId
        );

        if (existingRequest) {
            throw new BadRequestException(`Duplicate Reward Request for Reward ID: ${createDto.rewardId}`);
        }

        let status = RewardRequestStatus.PENDING;
        if (!event?.isApproval) {
            status = RewardRequestStatus.APPROVED
        }

        await this.rewardRequestRepository.save(user.id, createDto, status);
    }

    async findAll(filter: RewardRequestFilterDto): Promise<RewardRequestResponseDto[]> {
        const rewardRequests = await this.rewardRequestRepository.findAll(filter);
        return rewardRequests.map(request => new RewardRequestResponseDto({
            id: request.id,
            eventId: request.eventId,
            rewardId: request.rewardId,
            userId: request.userId,
            status: request.status
        }));
    }

    async findMe(user: AuthenticatedUser): Promise<RewardRequestResponseDto[]> {
        const rewards = await this.rewardRequestRepository.findByUserId(user.id);
        return rewards.map(request => new RewardRequestResponseDto({
            id: request.id,
            eventId: request.eventId,
            rewardId: request.rewardId,
            userId: request.userId,
            status: request.status
        }));
    }

    async findById(requestId: string): Promise<RewardRequestResponseDto> {
        const rewardRequest = await this.rewardRequestRepository.findById(requestId);
        if (!rewardRequest) {
            throw new NotFoundException(`RewardRequest with ID ${requestId} not found.`);
        }
        return new RewardRequestResponseDto({
            id: rewardRequest.id,
            eventId: rewardRequest.eventId,
            rewardId: rewardRequest.rewardId,
            userId: rewardRequest.userId,
            status: rewardRequest.status
        });
    }


    async update(requestId: string, updateDto: UpdateRewardStatusRequestDto): Promise<void> {
        await this.rewardRequestRepository.update(requestId, updateDto);
    }
}
