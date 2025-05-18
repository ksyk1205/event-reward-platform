import { IsNumber, IsOptional, IsObject, IsArray } from 'class-validator';

export class ResponseDto<T> {
    @IsObject()
    data: T;

    @IsOptional()
    @IsObject()
    meta?: {
        totalCount?: number;
        page?: number;
        pageSize?: number;
    };

    constructor(data: T, meta?: { totalCount?: number; page?: number; pageSize?: number }) {
        this.data = data;
        if (meta) {
            this.meta = meta;
        }
    }
}
