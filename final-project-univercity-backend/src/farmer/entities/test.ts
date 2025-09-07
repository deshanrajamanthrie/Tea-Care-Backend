import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { YourAuthService } from './your-auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { describe, it } from 'node:test';
// Add this import for Jest types
import 'jest';
let jest

describe('AuthService', () => {
    let service: YourAuthService;
    let jwtService: JwtService;
    let userRepository: any;

    const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                YourAuthService,
                JwtService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<YourAuthService>(YourAuthService);
        jwtService = module.get<JwtService>(JwtService);
        userRepository = module.get(getRepositoryToken(User));
    });

    describe('login', () => {
        it('should return access_token and user when credentials are valid', async () => {
            // mock validateUser inside service
            jest.spyOn(service, 'validateUser').mockResolvedValue(mockUser as User);
            jest.spyOn(jwtService, 'sign').mockReturnValue('jwt-token');

            const result = await service.login({ email: 'test@example.com', password: '123456' });

            expect(service.validateUser).toHaveBeenCalledWith('test@example.com', '123456');
            expect(jwtService.sign).toHaveBeenCalledWith({ email: mockUser.email, sub: mockUser.id });
            expect(result).toEqual({
                message: 'Login successful',
                user: mockUser,
                access_token: 'jwt-token',
            });
        });

        it('should throw UnauthorizedException when credentials are invalid', async () => {
            jest.spyOn(service, 'validateUser').mockResolvedValue(null);

            await expect(service.login({ email: 'wrong@example.com', password: 'wrong' }))
                .rejects
                .toThrow(UnauthorizedException);
        });
    });

    describe('findById', () => {
        it('should return a user when found', async () => {
            userRepository.findOne.mockResolvedValue(mockUser);

            const result = await service.findById(1);

            expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(mockUser);
        });

        it('should return undefined when user is not found', async () => {
            userRepository.findOne.mockResolvedValue(undefined);

            const result = await service.findById(999);

            expect(result).toBeUndefined();
        });
    });

    describe('findByEmail', () => {
        it('should return a user when found', async () => {
            userRepository.findOne.mockResolvedValue(mockUser);

            const result = await service.findByEmail('test@example.com');

            expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
            expect(result).toEqual(mockUser);
        });

        it('should return undefined when user is not found', async () => {
            userRepository.findOne.mockResolvedValue(undefined);

            const result = await service.findByEmail('missing@example.com');

            expect(result).toBeUndefined();
        });
    });
});

function beforeEach(arg0: () => Promise<void>) {
    // This is a helper for Jest's beforeEach, so just call the callback
    // (In Jest, beforeEach is globally available, so this is not needed.)
    arg0();
}
function beforeEach(arg0: () => Promise<void>) {
    throw new Error('Function not implemented.');
}
const expect = jestExpect;
function expect(findOne: any) {
    throw new Error('Function not implemented.');
}

