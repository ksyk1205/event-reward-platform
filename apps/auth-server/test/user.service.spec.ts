import {UserService} from "../src/application/services/user.service";
import {UserRepository} from "../src/infrastructure/repositories/user.repository";
import {User} from "../src/infrastructure/schemas/user.schema";
import {CreateRequestDto, UpdateRequestDto, UserResponseDto} from "../src/presentation/dto/user.dto";
import {BadRequestException} from "@nestjs/common";
import {Role} from "../src/common/enums/roles.enum";

describe('UserService', () => {
    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = {
            findAll: jest.fn(),
            findOneByUserId: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as unknown as UserRepository;

        userService = new UserService(userRepository);
    });

    describe('findAll', () => {
        it('모든 유저를 조회하고 DTO로 반환한다.', async () => {
            // Given
            const users: User[] = [
                {
                    id: '1',
                    userId: 'user1',
                    role: 'USER',
                    lastLoginAt: new Date(),
                } as unknown as User,
                {
                    id: '2',
                    userId: 'user2',
                    role: 'ADMIN',
                    lastLoginAt: new Date(),
                } as unknown as User,
            ];

            (userRepository.findAll as jest.Mock).mockResolvedValue(users);

            // When
            const result = await userService.findAll();

            // Then
            expect(result).toHaveLength(2);
            expect(result[0]).toBeInstanceOf(UserResponseDto);
            expect(result[0].userId).toBe('user1');
            expect(result[1].userId).toBe('user2');
        });
    });

    describe('findOne', () => {
        it('userId로 유저를 조회한다.', async () => {
            // Given
            const mockUser = {
                id: '1',
                userId: 'testuser',
                role: 'USER',
                lastLoginAt: new Date(),
            } as unknown as User;

            (userRepository.findOneByUserId as jest.Mock).mockResolvedValue(mockUser);

            // When
            const result = await userService.findOne('testuser');

            // Then
            expect(result).toEqual(mockUser);
        });

        it('존재하지 않는 userId로 조회하면 null을 반환한다.', async () => {
            // Given
            (userRepository.findOneByUserId as jest.Mock).mockResolvedValue(null);

            // When
            const result = await userService.findOne('notExistUser');

            // Then
            expect(result).toBeNull();
        });
    });

    describe('create', () => {
        it('유저를 생성한다.', async () => {
            // Given
            const userData: CreateRequestDto = {
                userId: 'newuser',
                password: 'password',
                role: Role.USER,
            };

            (userRepository.findOneByUserId as jest.Mock).mockResolvedValue(null);

            // When
            await userService.create(userData);

            // Then
            expect(userRepository.save).toHaveBeenCalledWith({
                userId: 'newuser',
                password: 'password',
                role: 'USER',
            });
        });

        it('이미 존재하는 유저가 있으면 BadRequestException이 발생한다.', async () => {
            // Given
            const userData: CreateRequestDto = {
                userId: 'existingUser',
                password: 'password',
                role: Role.USER,
            };

            (userRepository.findOneByUserId as jest.Mock).mockResolvedValue({ userId: 'existingUser' });

            // When & Then
            await expect(userService.create(userData))
                .rejects
                .toThrow(BadRequestException);
        });
    });

    describe('update', () => {
        it('유저 정보를 업데이트한다.', async () => {
            // Given
            const updateData: UpdateRequestDto = {
                password: 'newpassword',
                role: Role.ADMIN,
            };

            const mockUser = {
                id: '1',
                userId: 'testuser',
                role: Role.USER,
            } as unknown as User;

            (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);
            (userRepository.update as jest.Mock).mockResolvedValue({ ...mockUser, ...updateData });

            // When
            const result = await userService.update('1', updateData);

            // Then
            expect(result).toEqual({ ...mockUser, ...updateData });
        });

        it('존재하지 않는 유저를 업데이트하려고 하면 에러를 발생시킨다.', async () => {
            // Given
            (userRepository.findOne as jest.Mock).mockResolvedValue(null);

            // When & Then
            await expect(userService.update('999', { password: 'newpass' }))
                .rejects
                .toThrow(Error);
        });
    });

    describe('delete', () => {
        it('유저를 삭제한다.', async () => {
            // When
            await userService.delete('1');

            // Then
            expect(userRepository.delete).toHaveBeenCalledWith('1');
        });
    });
});
