import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {RewardRequestStatus} from "../../common/enums/reward-request-status.enum";

export class UpdateRewardStatusRequestDto {
    @IsEnum(RewardRequestStatus)
    status: RewardRequestStatus;
}