import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Param,
    Body,
    HttpStatus,
    HttpCode
} from '@nestjs/common';
import { RewardService } from '../../application/services/reward.service';
import {CreateRewardRequestDto, RewardResponseDto, UpdateRewardRequestDto} from "../dto/reward.dto";
import {ResponseDto} from "../../common/dtos/response.dto";
import {AuthenticatedUser, CurrentUser} from "../../common/decorators/user.decorator";

@Controller('events/:eventId/rewards')
export class RewardController {
    constructor(private readonly rewardService: RewardService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @CurrentUser() user: AuthenticatedUser,
        @Param('eventId') eventId: string,
        @Body() rewardData: CreateRewardRequestDto
    ): Promise<void> {
        console.log("!!!!!!!!!!!!!!!!!!!!");
        await this.rewardService.create(user, eventId, rewardData);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Param('eventId') eventId: string): Promise<ResponseDto<RewardResponseDto[]>> {
        console.log("!!!!!!!!!!!!!!!!!!!!");
        const rewards = await this.rewardService.findAll(eventId);
        return new ResponseDto(rewards, {totalCount: rewards.length});
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('eventId') eventId: string, @Param('id') rewardId: string): Promise<ResponseDto<RewardResponseDto>> {
        console.log("!!!!!!!!!!!!!!!!!!!!");
        const reward = await this.rewardService.findById(eventId, rewardId);
        return new ResponseDto(reward);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @CurrentUser() user: AuthenticatedUser,
        @Param('eventId') eventId: string,
        @Param('id') rewardId: string,
        @Body() updateData: UpdateRewardRequestDto
    ): Promise<ResponseDto<RewardResponseDto>> {
        const reward = await this.rewardService.update(user, eventId, rewardId, updateData);
        return new ResponseDto(reward);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('eventId') eventId: string, @Param('id') rewardId: string): Promise<void> {
        await this.rewardService.delete(eventId, rewardId);
    }
}
