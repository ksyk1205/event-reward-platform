import { IsString, IsDate, IsEnum, IsArray, IsOptional, IsBoolean } from 'class-validator';
import {EventStatus} from "../../common/enums/event-status.enum";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateEventRequestDto {
    @ApiProperty({ description: '이벤트 제목', example: '신규 회원 이벤트' })
    @IsString()
    title: string;

    @ApiProperty({ description: '이벤트 설명', example: '회원가입 후 보상 제공', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: '이벤트 시작일', example: '2025-06-01T00:00:00.000Z' })
    @IsDate()
    startDate: Date;

    @ApiProperty({ description: '이벤트 종료일', example: '2025-06-30T23:59:59.999Z' })
    @IsDate()
    endDate: Date;

    @ApiProperty({ description: '이벤트 상태', enum: EventStatus })
    @IsEnum(EventStatus)
    status: EventStatus;

    @ApiProperty({ description: '조건 배열', type: [String] })
    @IsArray()
    @IsString({ each: true })
    conditions: string[];

    @ApiProperty({ description: '승인 여부', required: false })
    @IsOptional()
    @IsBoolean()
    isApproval: boolean;
}

export class EventResponseDto {
    @ApiProperty({ description: '이벤트 ID' })
    id: string;

    @ApiProperty({ description: '이벤트 제목' })
    title: string;

    @ApiProperty({ description: '이벤트 설명' })
    description: string;

    @ApiProperty({ description: '시작일' })
    startDate: Date;

    @ApiProperty({ description: '종료일' })
    endDate: Date;

    @ApiProperty({ description: '이벤트 상태' })
    status: string;

    @ApiProperty({ description: '조건 배열', type: [String] })
    conditions: string[];

    @ApiProperty({ description: '승인 여부' })
    isApproval: boolean;

    @ApiProperty({ description: '참여자 수' })
    participantCount: number;

    @ApiProperty({ description: '수정자 ID' })
    updatedBy: string;

    @ApiProperty({ description: '생성자 ID' })
    createdBy: string;

    constructor(partial: Partial<EventResponseDto>) {
        Object.assign(this, partial);
    }
}

export class UpdateEventRequestDto {
    @ApiPropertyOptional({ description: '이벤트 제목' })
    @IsOptional()
    @IsString()
    title: string;

    @ApiPropertyOptional({ description: '이벤트 설명' })
    @IsOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional({ description: '이벤트 시작일' })
    @IsOptional()
    @IsDate()
    startDate: Date;

    @ApiPropertyOptional({ description: '이벤트 종료일' })
    @IsOptional()
    @IsDate()
    endDate: Date;

    @ApiPropertyOptional({ description: '이벤트 상태', enum: EventStatus })
    @IsOptional()
    @IsEnum(EventStatus)
    status: EventStatus;

    @ApiPropertyOptional({ description: '조건 배열', type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    conditions: string[];

    @ApiPropertyOptional({ description: '승인 여부' })
    @IsOptional()
    @IsBoolean()
    isApproval?: boolean;
}