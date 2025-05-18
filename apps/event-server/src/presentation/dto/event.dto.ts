import { IsString, IsDate, IsEnum, IsArray, IsOptional, IsBoolean } from 'class-validator';
import {EventStatus} from "../../common/enums/event-status.enum";

export class CreateEventRequestDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;

    @IsEnum(EventStatus)
    status: EventStatus;

    @IsArray()
    @IsString({ each: true })
    conditions: string[];

    @IsOptional()
    @IsBoolean()
    isApproval?: boolean;
}

export class EventResponseDto {
    id: string;

    title: string;

    description: string;

    startDate: Date;

    endDate: Date;

    status: string;

    conditions: string[];

    isApproval: boolean;

    participantCount: number;

    updatedBy:string

    createdBy: string;

    constructor(partial: Partial<EventResponseDto>) {
        Object.assign(this, partial);
    }
}

export class UpdateEventRequestDto {

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsDate()
    @IsOptional()
    startDate: Date;

    @IsDate()
    @IsOptional()
    endDate: Date;

    @IsOptional()
    @IsEnum(EventStatus)
    status: EventStatus;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    conditions: string[];

    @IsOptional()
    @IsBoolean()
    isApproval?: boolean;
}