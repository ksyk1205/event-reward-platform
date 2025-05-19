import {
    Controller,
    Get,
    Param,
    HttpCode,
    HttpStatus, Patch, Body, Post, Query,
} from '@nestjs/common';
import {RewardRequestService} from '../../application/services/reward-request.service';
import {AuthenticatedUser, CurrentUser} from "../../common/decorators/user.decorator";
import {
    CreateRewardRequestDto,
    RewardRequestFilterDto,
    RewardRequestResponseDto,
    UpdateRewardStatusRequestDto
} from "../dto/reward-request.dto";
import {ResponseDto} from "../../common/dtos/response.dto";

@Controller('rewards/request')
export class RewardRequestController {
    constructor(private readonly rewardRequestService: RewardRequestService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @CurrentUser() user: AuthenticatedUser,
        @Body() createDto: CreateRewardRequestDto
    ): Promise<void> {
        await this.rewardRequestService.create(user, createDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(
        @Query() filters: RewardRequestFilterDto
    ): Promise<ResponseDto<RewardRequestResponseDto[]>> {
        const queryFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== undefined)
        );
        const requests = await this.rewardRequestService.findAll(queryFilters);
        return new ResponseDto(requests, {totalCount: requests.length});
    }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    async findMe(
        @CurrentUser() user: AuthenticatedUser
    ): Promise<ResponseDto<RewardRequestResponseDto[]>> {
        const requests = await this.rewardRequestService.findMe(user);
        return new ResponseDto(requests, {totalCount: requests.length});
    }

    @Get(':requestId')
    @HttpCode(HttpStatus.OK)
    async findById(
        @Param('requestId') requestId: string
    ): Promise<ResponseDto<RewardRequestResponseDto>> {
        return new ResponseDto(await this.rewardRequestService.findById(requestId));
    }

    @Patch(':requestId/status')
    @HttpCode(HttpStatus.OK)
    async updateStatus(
        @Param('requestId') requestId: string,
        @Body() updateDto: UpdateRewardStatusRequestDto
    ): Promise<void> {
        await this.rewardRequestService.update(requestId, updateDto);
    }
}
