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
import { EventRewardService } from '../../application/services/event-reward.service';
import {
    CreateEventRewardRequestDto,
    EventRewardResponseDto,
    UpdateEventRewardRequestDto
} from "../dto/event-reward.dto";
import {ResponseDto} from "../../common/dtos/response.dto";
import {AuthenticatedUser, CurrentUser} from "../../common/decorators/user.decorator";

@Controller('events/:eventId/rewards')
export class EventRewardController {
    constructor(private readonly eventRewardService: EventRewardService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @CurrentUser() user: AuthenticatedUser,
        @Param('eventId') eventId: string,
        @Body() rewardData: CreateEventRewardRequestDto
    ): Promise<void> {
        await this.eventRewardService.create(user, eventId, rewardData);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Param('eventId') eventId: string): Promise<ResponseDto<EventRewardResponseDto[]>> {
        const rewards = await this.eventRewardService.findAll(eventId);
        return new ResponseDto(rewards, {totalCount: rewards.length});
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('eventId') eventId: string, @Param('id') rewardId: string): Promise<ResponseDto<EventRewardResponseDto>> {
        const reward = await this.eventRewardService.findById(eventId, rewardId);
        return new ResponseDto(reward);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @CurrentUser() user: AuthenticatedUser,
        @Param('eventId') eventId: string,
        @Param('id') rewardId: string,
        @Body() updateData: UpdateEventRewardRequestDto
    ): Promise<ResponseDto<EventRewardResponseDto>> {
        const reward = await this.eventRewardService.update(user, eventId, rewardId, updateData);
        return new ResponseDto(reward);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('eventId') eventId: string, @Param('id') rewardId: string): Promise<void> {
        await this.eventRewardService.delete(eventId, rewardId);
    }
}
