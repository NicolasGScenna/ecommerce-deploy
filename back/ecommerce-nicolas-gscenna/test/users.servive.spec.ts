import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/modules/users/users.service';
import { UsersRepository } from '../src/modules/users/users.repository';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockUsersRepository = {
    getUsers: jest.fn(),
    getById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(usersService).toBeDefined();
  });

  it('debería devolver una lista de usuarios', async () => {
    const users = [
      {
        id: '123',
        name: 'Nicolas',
        email: 'nico@test.com',
        phone: 123456,
        address: 'Test address',
      },
    ];

    mockUsersRepository.getUsers.mockResolvedValue(users);

    const result = await usersService.getUsers(1, 5);

    expect(result).toEqual(users);

    expect(mockUsersRepository.getUsers)
      .toHaveBeenCalledWith(1, 5);
  });

  it('debería devolver un usuario por ID', async () => {
    const user = {
      id: '123',
      name: 'Nicolas',
      email: 'nico@test.com',
      phone: 123456,
      address: 'Test address',
    };

    mockUsersRepository.getById.mockResolvedValue(user);

    const result = await usersService.getUserById('123');

    expect(result).toEqual(user);

    expect(mockUsersRepository.getById)
      .toHaveBeenCalledWith('123');
  });

  it('debería eliminar un usuario', async () => {
    mockUsersRepository.deleteUser.mockResolvedValue(
      'Usuario eliminado correctamente',
    );

    const result = await usersService.deleteUser('123');

    expect(result).toBe('Usuario eliminado correctamente');

    expect(mockUsersRepository.deleteUser)
      .toHaveBeenCalledWith('123');
  });
});