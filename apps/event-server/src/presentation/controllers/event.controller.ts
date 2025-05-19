import {Controller, Get, Post, Delete, Param, Body, Patch, HttpStatus, HttpCode} from '@nestjs/common';
import {EventService} from '../../application/services/event.service';
import {CreateEventRequestDto, EventResponseDto, UpdateEventRequestDto} from "../dto/event.dto";
import {AuthenticatedUser, CurrentUser} from "../../common/decorators/user.decorator";
import {ResponseDto} from "../../common/dtos/response.dto";

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@CurrentUser() user: AuthenticatedUser,
                 @Body() eventData: CreateEventRequestDto
    ): Promise<void> {
        await this.eventService.create(user, eventData);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<ResponseDto<EventResponseDto[]>> {
        const eventList = await this.eventService.findAll();
        return new ResponseDto(eventList, {totalCount: eventList.length});
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
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

