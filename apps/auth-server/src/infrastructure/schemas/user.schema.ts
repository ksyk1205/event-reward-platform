import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import {Role} from "../../common/enums/roles.enum";
import {Timestamp} from "rxjs";

@Schema({ timestamps: true })
export class User extends Document {

    @Prop({ required: true })
    userid: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: mongoose.SchemaTypes.String, enum: Role, default: Role.USER })
    role: Role;

    @Prop({ type: Date, default: null })
    lastLoginAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
