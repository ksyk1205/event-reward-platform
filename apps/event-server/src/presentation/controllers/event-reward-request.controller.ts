import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Body,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {EventRewardRequestService} from '../../application/services/event-reward-request.service';
import {AuthenticatedUser, CurrentUser} from "../../common/decorators/user.decorator";
import {UpdateRewardStatusRequestDto} from "../dto/event-reward-request.dto";

@Controller('events/:eventId/rewards/:rewardId/request')
export class EventRewardRequestController {
    constructor(private readonly rewardRequestService: EventRewardRequestService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Param('eventId') eventId: string,
        @Param('rewardId') rewardId: string,
        @CurrentUser() user: AuthenticatedUser,
    ) {
        await this.rewardRequestService.create(user, eventId, rewardId);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Param('eventId') eventId: string,
        @Param('rewardId') rewardId: string
    ) {
        return await this.rewardRequestService.findAll(eventId, rewardId);
    }

    @Get(':requestId')
    @HttpCode(HttpStatus.OK)
    async findById(
        @Param('eventId') eventId: string,
        @Param('rewardId') rewardId: string,
        @Param('requestId') requestId: string
    ) {
        return await this.rewardRequestService.findById(eventId, rewardId, requestId);
    }

    @Patch(':requestId/status')
    @HttpCode(HttpStatus.OK)
    async updateStatus(
        @Param('eventId') eventId: string,
        @Param('rewardId') rewardId: string,
        @Param('requestId') requestId: string,
        @Body() updateDto: UpdateRewardStatusRequestDto
    ) {
        await this.rewardRequestService.update(eventId, rewardId, requestId, updateDto);
    }
}
