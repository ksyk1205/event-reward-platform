import {IsEnum, IsOptional, IsString} from "class-validator";
import {RewardRequestStatus} from "../../common/enums/reward-request-status.enum";

export class RewardRequestResponseDto {
    id: string;

    eventId: string;

    rewardId: string;

    userId: string;

    status: string;

    constructor(partial: Partial<RewardRequestResponseDto>) {
        Object.assign(this, partial);
    }
}

export class UpdateRewardStatusRequestDto {
    @IsEnum(RewardRequestStatus)
    status: RewardRequestStatus;
}

export class RewardRequestFilterDto {
    @IsOptional()
    @IsString()
    eventId?: string;

    @IsOptional()
    @IsString()
    rewardId?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    userId?: string;
}

export class CreateRewardRequestDto {
    @IsString()
    eventId: string;

    @IsString()
    rewardId: string;
}