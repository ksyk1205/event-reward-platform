import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {RewardType} from "../../common/enums/reward-type.enum";

@Schema({ timestamps: true })
export class Reward extends Document {
    @Prop()
    eventId: string;

    @Prop({ required: true })
    type: RewardType;

    @Prop()
    description: string;

    @Prop({ required: true })
    quantity: number;

    @Prop()
    createdBy: string;

    @Prop()
    updatedBy: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
