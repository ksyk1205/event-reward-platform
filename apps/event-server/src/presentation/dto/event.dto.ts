import { IsString, IsDate, IsEnum, IsArray, IsOptional, IsBoolean } from 'class-validator';
import {EventStatus} from "../../common/enums/event-status.enum";
import {ApiProperty} from "@nestjs/swagger";

export class CreateEventRequestDto {

    @ApiProperty({ description: '이벤트 제목' })
    @IsString()
    title: string;

    @ApiProperty({ description: '이벤트 설명', required: false })
    @IsString()
    description?: string;

    @ApiProperty({ description: '이벤트 시작 날짜', example: '2025-05-18T00:00:00.000Z' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: '이벤트 종료 날짜', example: '2025-05-20T00:00:00.000Z' })
    @IsDate()
    endDate: Date;

    @ApiProperty({ description: '이벤트 상태', example: ['ACTIVE'] })
    @IsEnum(EventStatus)
    status: EventStatus;

    @ApiProperty({ description: '이벤트 조건 목록', example: ['login_7_days', 'invite_friend'] })
    @IsArray()
    @IsString({ each: true })
    conditions: string[];

    @ApiProperty({ description: '승인 요청 여부', example: true })
    @IsOptional()
    @IsBoolean()
    isApproval: boolean;
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