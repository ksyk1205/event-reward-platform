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
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateEventRequestDto} from "../dto/event.dto";

@ApiTags('EventRewardRequest')
@Controller('rewards/request')
export class RewardRequestController {
    constructor(private readonly rewardRequestService: RewardRequestService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: '이벤트 보상 요청'})
    @ApiBody({type: CreateRewardRequestDto})
    @ApiResponse({status: 201, description: '이벤트가 보상이 요청되었습니다.'})
    async create(
        @CurrentUser() user: AuthenticatedUser,
        @Body() createDto: CreateRewardRequestDto
    ): Promise<void> {
        await this.rewardRequestService.create(user, createDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '내 보상 요청 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '현재 유저의 보상 요청 목록을 반환합니다.',
        type: ResponseDto,
    })
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
    @ApiOperation({ summary: '자신이 요청한 보상을 조회' })
    @ApiResponse({
        status: 200,
        description: '자신이 요청한 보상 데이터를 반환합니다.',
        type: RewardRequestResponseDto,
    })
    async findMe(
        @CurrentUser() user: AuthenticatedUser
    ): Promise<ResponseDto<RewardRequestResponseDto[]>> {
        const requests = await this.rewardRequestService.findMe(user);
        return new ResponseDto(requests, {totalCount: requests.length});
    }

    @Get(':requestId')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '보상 요청 상세 조회' })
    @ApiParam({ name: 'requestId', description: '보상 요청 ID' })
    @ApiResponse({
        status: 200,
        description: '보상 요청 상세 데이터를 반환합니다.',
        type: RewardRequestResponseDto,
    })
    async findById(
        @Param('requestId') requestId: string
    ): Promise<ResponseDto<RewardRequestResponseDto>> {
        return new ResponseDto(await this.rewardRequestService.findById(requestId));
    }

    @Patch(':requestId/status')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '보상 요청 상태 변경' })
    @ApiParam({ name: 'requestId', description: '보상 요청 ID' })
    @ApiResponse({
        status: 200,
        description: '보상 요청 상태가 성공적으로 변경됨',
    })
    async updateStatus(
        @Param('requestId') requestId: string,
        @Body() updateDto: UpdateRewardStatusRequestDto
    ): Promise<void> {
        await this.rewardRequestService.update(requestId, updateDto);
    }
}
