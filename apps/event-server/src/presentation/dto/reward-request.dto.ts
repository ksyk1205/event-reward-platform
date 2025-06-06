import {IsEnum, IsOptional, IsString} from "class-validator";
import {RewardRequestStatus} from "../../common/enums/reward-request-status.enum";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class RewardRequestResponseDto {
    @ApiProperty({ example: 'req123', description: '보상 요청 ID' })
    id: string;

    @ApiProperty({ example: 'event456', description: '이벤트 ID' })
    eventId: string;

    @ApiProperty({ example: 'reward789', description: '보상 ID' })
    rewardId: string;

    @ApiProperty({ example: 'user001', description: '사용자 ID' })
    userId: string;

    @ApiProperty({ example: 'PENDING', description: '보상 요청 상태' })
    status: string;

    constructor(partial: Partial<RewardRequestResponseDto>) {
        Object.assign(this, partial);
    }
}

export class UpdateRewardStatusRequestDto {
    @ApiProperty({ enum: RewardRequestStatus, example: RewardRequestStatus.APPROVED, description: '변경할 보상 요청 상태' })
    @IsEnum(RewardRequestStatus)
    status: RewardRequestStatus;
}

export class RewardRequestFilterDto {
    @ApiPropertyOptional({ example: 'event456', description: '이벤트 ID (필터)' })
    @IsOptional()
    @IsString()
    eventId?: string;

    @ApiPropertyOptional({ example: 'reward789', description: '보상 ID (필터)' })
    @IsOptional()
    @IsString()
    rewardId?: string;

    @ApiPropertyOptional({ example: 'APPROVED', description: '보상 상태 (필터)' })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiPropertyOptional({ example: 'user001', description: '사용자 ID (필터)' })
    @IsOptional()
    @IsString()
    userId?: string;
}

export class CreateRewardRequestDto {
    @ApiProperty({ example: 'event456', description: '이벤트 ID' })
    @IsString()
    eventId: string;

    @ApiProperty({ example: 'reward789', description: '보상 ID' })
    @IsString()
    rewardId: string;
}