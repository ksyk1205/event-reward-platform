import {Controller, Get, Post, Delete, Param, Body, Patch, HttpStatus, HttpCode} from '@nestjs/common';
import {EventService} from '../../application/services/event.service';
import {CreateEventRequestDto, EventResponseDto, UpdateEventRequestDto} from "../dto/event.dto";
import {AuthenticatedUser, CurrentUser} from "../../common/decorators/user.decorator";
import {ResponseDto} from "../../common/dtos/response.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Events')
@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: '이벤트 생성' })
    @ApiResponse({ status: 201, description: '이벤트가 성공적으로 생성되었습니다.' })
    @ApiResponse({ status: 400, description: '잘못된 요청입니다.' })
    async create(@CurrentUser() user: AuthenticatedUser,
                 @Body() eventData: CreateEventRequestDto
    ): Promise<void> {
        await this.eventService.create(user, eventData);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '이벤트 조회' })
    @ApiResponse({ status: 200, description: '이벤트 정보를 반환합니다.' })
    @ApiResponse({ status: 404, description: '이벤트를 찾을 수 없습니다.' })
    async findAll(): Promise<ResponseDto<EventResponseDto[]>> {
        const eventList = await this.eventService.findAll();
        return new ResponseDto(eventList, {totalCount: eventList.length});
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '이벤트 단일 조회' })
    @ApiResponse({ status: 200, description: '이벤트 정보를 반환합니다.' })
    @ApiResponse({ status: 404, description: '이벤트를 찾을 수 없습니다.' })
    async findById(@Param('id') eventId: string): Promise<ResponseDto<EventResponseDto>> {
        console.log(`[EventController] Looking for Event ID: ${eventId}`);
        const event = await this.eventService.findById(eventId);
        return new ResponseDto(event);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(@CurrentUser() user: AuthenticatedUser,
                 @Param('id') eventId: string,
                 @Body() updateData: UpdateEventRequestDto
    ): Promise<ResponseDto<EventResponseDto>> {
        const event = await this.eventService.update(user, eventId, updateData);
        return new ResponseDto(event);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') eventId: string): Promise<void> {
        await this.eventService.delete(eventId);
    }
}

