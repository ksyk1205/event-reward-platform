import {HttpStatus} from "@nestjs/common";

export class ErrorResponseDto {
    statusCode: number;

    error: string;

    message: string;

    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = HttpStatus[statusCode];
    }
}
