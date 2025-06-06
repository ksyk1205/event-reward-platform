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
import {ApiBody, ApiExtraModels, ApiOperation, ApiParam, ApiResponse, ApiTags, getSchemaPath} from "@nestjs/swagger";
import {EventResponseDto, UpdateEventRequestDto} from "../dto/event.dto";

@ApiTags('EventReward')
@Controller('events/:eventId/rewards')
export class EventRewardController {
    constructor(private readonly eventRewardService: EventRewardService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: '이벤트 보상 생성'})
    @ApiParam({name: 'eventId', description: '이벤트 ID'})
    @ApiBody({type: CreateEventRewardRequestDto})
    @ApiResponse({status: 201, description: '이벤트가 보상 생성되었습니다.'})
    async create(
        @CurrentUser() user: AuthenticatedUser,
        @Param('eventId') eventId: string,
        @Body() rewardData: CreateEventRewardRequestDto
    ): Promise<void> {
        await this.eventRewardService.create(user, eventId, rewardData);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '이벤트 모든 보상 조회'})
    @ApiParam({name: 'eventId', description: '이벤트 ID'})
    @ApiExtraModels(EventRewardResponseDto)
    @ApiResponse({
        status: 200,
        description: '이벤트 보상 목록을 성공적으로 반환함',
        schema: {
            type: 'array',
            items: {$ref: getSchemaPath(EventRewardResponseDto)},
        },
    })
    async findAll(@Param('eventId') eventId: string): Promise<ResponseDto<EventRewardResponseDto[]>> {
        const rewards = await this.eventRewardService.findAll(eventId);
        return new ResponseDto(rewards, {totalCount: rewards.length});
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '이벤트 보상 단일 조회'})
    @ApiParam({name: 'eventId', description: '이벤트 ID'})
    @ApiResponse({
        status: 200,
        description: '이벤트 보상 정보를 반환합니다.',
        type: EventRewardResponseDto
    })
    async findById(@Param('eventId') eventId: string, @Param('id') rewardId: string): Promise<ResponseDto<EventRewardResponseDto>> {
        const reward = await this.eventRewardService.findById(eventId, rewardId);
        return new ResponseDto(reward);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '이벤트 보상 정보 수정'})
    @ApiParam({name: 'eventId', description: '이벤트 ID'})
    @ApiParam({ name: 'id', description: 'ID' })
    @ApiBody({type: UpdateEventRewardRequestDto})
    @ApiResponse({status: 201, description: '이벤트 보상 수정 완료', type: EventRewardResponseDto})
    @ApiResponse({status: 404, description: '이벤트 보상을 찾을 수 없음'})
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
    @ApiOperation({ summary: '이벤트 보상 삭제' })
    @ApiParam({name: 'eventId', description: '이벤트 ID'})
    @ApiParam({ name: 'id', description: 'ID' })
    @ApiResponse({ status: 204, description: '이벤트 보상 삭제 완료' })
    async delete(@Param('eventId') eventId: string, @Param('id') rewardId: string): Promise<void> {
        await this.eventRewardService.delete(eventId, rewardId);
    }
}
