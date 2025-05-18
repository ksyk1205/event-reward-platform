import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from '../../presentation/controllers/event.controller';
import { EventService } from '../../application/services/event.service';
import { Event, EventSchema } from '../../infrastructure/schemas/event.schema';
import { EventRepository } from '../../infrastructure/repositories/event.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    ],
    controllers: [EventController],
    providers: [EventService, EventRepository],
    exports: [EventService, EventRepository],
})
export class EventModule {}
