import {BadRequestException, Injectable} from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import {User} from "../../infrastructure/schemas/user.schema";
import {CreateRequestDto, UpdateRequestDto} from "../../presentation/dto/user.dto";

@Injectable()
export class UserService{
    constructor(private readonly userRepository: UserRepository) {}

    async findOne(userid: string): Promise<User | null> {
        const user = await this.userRepository.findOne(userid);

        return user;
    }

    async create(userData: CreateRequestDto): Promise<void> {
        const existingUser = await this.userRepository.findOne(userData.userid ?? '');

        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        await this.userRepository.save({
            userid: userData.userid,
            password: userData.password,
            role: userData.role
        });
    }

    async update(userid: string, updateData: UpdateRequestDto): Promise<User | null> {
        const existingUser = await this.userRepository.findOne(userid);
        if (!existingUser) {
            throw new Error('User not found');
        }

        return await this.userRepository.update(userid, updateData);
    }

    async delete(userid: string): Promise<void> {
        await this.userRepository.delete(userid);
    }
}
