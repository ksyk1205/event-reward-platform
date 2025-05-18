import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {RewardRequestStatus} from "../../common/enums/reward-request-status.enum";

@Schema({timestamps: true})
export class RewardRequest extends Document {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    eventId: string;

    @Prop({ required: true })
    rewardId: string;

    @Prop({ type: String, enum: RewardRequestStatus, default: RewardRequestStatus.PENDING })
    status: RewardRequestStatus;

    @Prop({ type: Date, required: true })
    requestDate: Date;

    @Prop()
    approvalBy: string;

    @Prop()
    approvalDate: string;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);