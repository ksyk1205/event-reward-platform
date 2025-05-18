import {RewardType} from "../../common/enums/reward-type.enum";
import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";

export class RewardResponseDto {
    id: string;
    eventId: string;
    description: string;
    type: RewardType;
    quantity: number;

    constructor(partial: Partial<RewardResponseDto>) {
        Object.assign(this, partial);
    }
}

export class CreateRewardRequestDto {
    @IsString()
    description: string;

    @IsEnum(RewardType, {message: 'Reward type must be one of ITEM, COUPON, POINT'})
    type: RewardType;

    @IsNumber()
    quantity: number;
}

export class UpdateRewardRequestDto {
    @IsString()
    @IsOptional()
    description: string;

    @IsEnum(RewardType, {message: 'Reward type must be one of ITEM, COUPON, POINT'})
    @IsOptional()
    type: RewardType;

    @IsNumber()
    @IsOptional()
    quantity: number;
}