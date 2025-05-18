import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Event} from "../schemas/event.schema";
import mongoose, {Model, Types} from "mongoose";
import {UpdateEventRequestDto} from "../../presentation/dto/event.dto";

@Injectable()
export class EventRepository {
    constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {
    }

    async findAll(): Promise<Event[]> {
        return this.eventModel.find().exec();
    }

    async findOne(eventId: string): Promise<Event | null> {
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return null;
        }
        return this.eventModel.findById(eventId).exec();
    }

    async create(eventData: any): Promise<Event | null> {
        return new this.eventModel(eventData).save();
    }

    async delete(eventId: string): Promise<Event | null> {
        return this.eventModel.findByIdAndDelete(eventId).exec();
    }

    async update(userId: string, eventId: string, updateData: UpdateEventRequestDto): Promise<Event | null> {
        const event = await this.eventModel.findById(eventId).exec();
        if (!event) return null;

        event.set(updateData);
        event.updatedBy = userId;

        await event.save();
        return event;
    }
}