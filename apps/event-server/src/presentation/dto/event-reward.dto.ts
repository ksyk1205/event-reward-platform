import {RewardType} from "../../common/enums/reward-type.enum";
import {IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class EventRewardResponseDto {
    @ApiProperty({ example: 'abc123', description: '보상 ID' })
    id: string;

    @ApiProperty({ example: 'event456', description: '이벤트 ID' })
    eventId: string;

    @ApiProperty({ example: '10% 할인 쿠폰', description: '보상 설명' })
    description: string;

    @ApiProperty({ enum: RewardType, example: RewardType.COUPON, description: '보상 유형 (ITEM, COUPON, POINT)' })
    type: RewardType;

    @ApiProperty({ example: 100, description: '보상 수량' })
    quantity: number;

    constructor(partial: Partial<EventRewardResponseDto>) {
        Object.assign(this, partial);
    }
}

export class CreateEventRewardRequestDto {
    @ApiProperty({ example: '무료배송 쿠폰', description: '보상 설명' })
    @IsString()
    description: string;

    @ApiProperty({ enum: RewardType, example: RewardType.ITEM, description: '보상 유형 (ITEM, COUPON, POINT)' })
    @IsEnum(RewardType, { message: 'Reward type must be one of ITEM, COUPON, POINT' })
    type: RewardType;

    @ApiProperty({ example: 50, description: '보상 수량' })
    @IsNumber()
    quantity: number;
}

export class UpdateEventRewardRequestDto {
    @ApiPropertyOptional({ example: '포인트 100점', description: '보상 설명 (선택)' })
    @IsString()
    @IsOptional()
    description: string;

    @ApiPropertyOptional({ enum: RewardType, example: RewardType.POINT, description: '보상 유형 (선택)' })
    @IsEnum(RewardType, { message: 'Reward type must be one of ITEM, COUPON, POINT' })
    @IsOptional()
    type: RewardType;

    @ApiPropertyOptional({ example: 200, description: '보상 수량 (선택)' })
    @IsNumber()
    @IsOptional()
    quantity: number;
}