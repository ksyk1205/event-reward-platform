import {Injectable, NotFoundException} from '@nestjs/common';
import {EventRepository} from "../../infrastructure/repositories/event.repository";
import {CreateEventRequestDto, EventResponseDto, UpdateEventRequestDto} from "../../presentation/dto/event.dto";
import {AuthenticatedUser} from "../../common/decorators/user.decorator";

@Injectable()
export class EventService {
    constructor(private readonly eventRepository: EventRepository) {
    }

    async create(user: AuthenticatedUser, eventData: CreateEventRequestDto): Promise<void> {
        const createEvent = {
            title: eventData.title,
            description: eventData.description,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            status: eventData.status,
            conditions: eventData.conditions,
            isApproval: eventData.isApproval ?? true,
            participantCount: 0,
            updatedBy: user.id,
            createdBy: user.id
        }
        await this.eventRepository.create(createEvent);
    }

    async findAll(): Promise<EventResponseDto[]> {
        const events = await this.eventRepository.findAll();
        return events.map((event) =>
            new EventResponseDto({
                id: event.id,
                title: event.title,
                description: event.description,
                startDate: event.startDate,
                endDate: event.endDate,
                status: event.status,
                conditions: event.conditions,
                isApproval: event.isApproval,
                participantCount: event.participantCount,
                updatedBy: event.updatedBy,
                createdBy: event.createdBy
            }),
        );
    }

    async findById(eventId: string): Promise<EventResponseDto> {
        console.log(`[EventService] Looking for Event ID: ${eventId}`);
        const event = await this.eventRepository.findOne(eventId);
        if (!event) {
            throw new NotFoundException(`Event with ID ${eventId} not found.`);
        }
        return new EventResponseDto({
            id: event.id,
            title: event.title,
            description: event.description,
            startDate: event.startDate,
            endDate: event.endDate,
            status: event.status,
            conditions: event.conditions,
            isApproval: event.isApproval,
            participantCount: event.participantCount,
            updatedBy: event.updatedBy,
            createdBy: event.createdBy
        });
    }

    async update(user: AuthenticatedUser, eventId: string, updateData: UpdateEventRequestDto): Promise<EventResponseDto> {
        const updatedEvent = await this.eventRepository.update(user.id, eventId, updateData);
        if (!updatedEvent) {
            throw new NotFoundException(`Event with ID ${eventId} not found.`);
        }
        return new EventResponseDto({
            id: updatedEvent.id,
            title: updatedEvent.title,
            description: updatedEvent.description,
            startDate: updatedEvent.startDate,
            endDate: updatedEvent.endDate,
            status: updatedEvent.status,
            conditions: updatedEvent.conditions,
            isApproval: updatedEvent.isApproval,
            participantCount: updatedEvent.participantCount,
            updatedBy: updatedEvent.updatedBy,
            createdBy: updatedEvent.createdBy
        });
    }

    async delete(eventId: string): Promise<void> {
        await this.eventRepository.delete(eventId);
    }
}
