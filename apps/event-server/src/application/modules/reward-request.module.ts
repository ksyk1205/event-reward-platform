import {forwardRef, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardRequest, RewardRequestSchema } from '../../infrastructure/schemas/reward-request.schema';
import { RewardRequestRepository } from '../../infrastructure/repositories/reward-request.repository';
import {RewardRequestController} from "../../presentation/controllers/reward-request.controller";
import {RewardRequestService} from "../services/reward-request.service";
import {EventRepository} from "../../infrastructure/repositories/event.repository";
import {EventModule} from "./event.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: RewardRequest.name, schema: RewardRequestSchema }]),
        forwardRef(() => EventModule)
    ],
    controllers: [RewardRequestController],
    providers: [RewardRequestRepository, RewardRequestService],
    exports: [RewardRequestRepository, RewardRequestService]
})
export class RewardRequestModule {}
