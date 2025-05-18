import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';
import {EventStatus} from "../../common/enums/event-status.enum";

@Schema({ timestamps: true })
export class Event extends Document {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ type: Date, required: true })
    startDate: Date;

    @Prop({ type: Date, required: true })
    endDate: Date;

    @Prop({ type: String, enum: EventStatus, default: EventStatus.PENDING })
    status: EventStatus;

    @Prop({ type: [String], default: [] })
    conditions: string[];

    @Prop({ type: Boolean, default: false })
    isApproval: boolean;

    @Prop({ type: Number, default: 0 })
    participantCount: number;

    @Prop()
    updatedBy: string;

    @Prop()
    createdBy: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);