import {BadRequestException, Injectable} from '@nestjs/common';
import {UserRepository} from '../../infrastructure/repositories/user.repository';
import {User} from "../../infrastructure/schemas/user.schema";
import {CreateRequestDto, UpdateRequestDto, UserResponseDto} from "../../presentation/dto/user.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {
    }

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.findAll();

        return users.map(user => new UserResponseDto({
            id: user.id,
            userId: user.userId,
            role: user.role,
            lastLoginAt: user.lastLoginAt
        }));
    }

    async findOne(userId: string): Promise<User | null> {
        const user = await this.userRepository.findOneByUserId(userId);

        return user;
    }

    async create(userData: CreateRequestDto): Promise<void> {
        const existingUser = await this.userRepository.findOneByUserId(userData.userId);

        if (existingUser) {
            throw new BadRequestException('User already exists');
        }

        await this.userRepository.save({
            userId: userData.userId,
            password: userData.password,
            role: userData.role
        });
    }

    async update(id: string, updateData: UpdateRequestDto): Promise<User | null> {
        const existingUser = await this.userRepository.findOne(id);
        if (!existingUser) {
            throw new Error('User not found');
        }

        return await this.userRepository.update(id, updateData);
    }

    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
