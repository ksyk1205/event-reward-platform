import {RewardType} from "../../common/enums/reward-type.enum";
import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";

export class EventRewardResponseDto {
    id: string;
    eventId: string;
    description: string;
    type: RewardType;
    quantity: number;

    constructor(partial: Partial<EventRewardResponseDto>) {
        Object.assign(this, partial);
    }
}

export class CreateEventRewardRequestDto {
    @IsString()
    description: string;

    @IsEnum(RewardType, {message: 'Reward type must be one of ITEM, COUPON, POINT'})
    type: RewardType;

    @IsNumber()
    quantity: number;
}

export class UpdateEventRewardRequestDto {
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