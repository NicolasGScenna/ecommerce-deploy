import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/modules/auth/auth.service';
import { UsersRepository } from '../src/modules/users/users.repository';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
    let authService: AuthService;

    const mockUsersRepository = {
        getByEmail: jest.fn(),
    };

    const mockJwtService = {
        sign: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersRepository,
                    useValue: mockUsersRepository,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);

        jest.clearAllMocks();
    });

    it('debería estar definido', () => {
        expect(authService).toBeDefined();
    });
    it('debería iniciar sesión correctamente con password válido', async () => {
        mockUsersRepository.getByEmail.mockResolvedValue({
            id: '123',
            name: 'Rocio',
            email: 'rocio@email.com',
            password: '$2b$10$hash',
            phone: 123456789,
            address: 'Mi direccion',
            isAdmin: true,
        });

        jest
            .spyOn(require('bcrypt'), 'compare')
            .mockResolvedValue(true);

        mockJwtService.sign.mockReturnValue('token123');

        const result = await authService.signIn({
            email: 'rocio@email.com',
            password: '123456',
        });

        expect(result.token).toBe('token123');
        expect(result.user.email).toBe('rocio@email.com');

        expect(mockUsersRepository.getByEmail)
            .toHaveBeenCalledWith('rocio@email.com');

        expect(mockJwtService.sign).toHaveBeenCalled();
    });
    it('debería rechazar el login con password incorrecto', async () => {
        mockUsersRepository.getByEmail.mockResolvedValue({
            id: '123',
            name: 'Rocio',
            email: 'rocio@email.com',
            password: '$2b$10$hash',
            phone: 123456789,
            address: 'Mi direccion',
            isAdmin: false,
        });

        jest
            .spyOn(require('bcrypt'), 'compare')
            .mockResolvedValue(false);

        await expect(
            authService.signIn({
                email: 'rocio@email.com',
                password: 'passwordIncorrecto',
            }),
        ).rejects.toThrow('Email o contraseña incorrectos');
    });
});