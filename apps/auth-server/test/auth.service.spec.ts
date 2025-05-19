import {UserService} from "../src/application/services/user.service";
import {AuthService} from "../src/application/services/auth.service";
import {JwtService} from "@nestjs/jwt";
import {BadRequestException, UnauthorizedException} from "@nestjs/common";
import {User} from "../src/infrastructure/schemas/user.schema";

describe('AuthService', () => {
    let authService: AuthService;
    let userService: UserService;
    let jwtService: JwtService;

    beforeEach(() => {
        userService = {
            findOne: jest.fn(),
        } as unknown as UserService;

        jwtService = {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
        } as unknown as JwtService;

        authService = new AuthService(jwtService, userService);
    });

    it('유저가 존재하고 비밀번호가 맞으면 토큰을 생성한다.', async () => {
        // Given
        const mockUser = {
            _id: '12345',
            userId: 'testuser',
            password: 'testpass',
            role: 'USER',
            lastLoginAt: null,
            save: jest.fn(),
        } as unknown as User;

        (userService.findOne as jest.Mock).mockResolvedValue(mockUser);

        // When
        const token = await authService.login('testuser', 'testpass');

        // Then
        expect(token).toBe('mocked-jwt-token');
        expect(mockUser.lastLoginAt).not.toBeNull();
        expect(mockUser.save).toHaveBeenCalled();
    });

    it('유저가 존재하지 않으면 BadRequestException을 발생시킨다.', async () => {
        // Given
        (userService.findOne as jest.Mock).mockResolvedValue(null);

        // When & Then
        await expect(authService.login('notExistUser', 'testpass'))
            .rejects
            .toThrow(BadRequestException);
    });

    it('비밀번호가 맞지 않으면 UnauthorizedException을 발생시킨다.', async () => {
        // Given
        const mockUser = {
            _id: '12345',
            userId: 'testuser',
            password: 'correctpass',
            role: 'USER',
            lastLoginAt: null,
            save: jest.fn(),
        } as unknown as User;

        (userService.findOne as jest.Mock).mockResolvedValue(mockUser);

        // When & Then
        await expect(authService.login('testuser', 'wrongpass'))
            .rejects
            .toThrow(UnauthorizedException);
    });
});
