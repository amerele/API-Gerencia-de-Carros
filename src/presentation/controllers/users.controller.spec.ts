import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../../application/services/users.service';
import { BodyUsersDto } from '../../application/DTOs/body-users.dto';
import { Users } from '../../domain/entities/users.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findByPrimary: jest.fn(),
            findByUsername: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of all users', async () => {
      const result = [new Users(), new Users()];
      jest.spyOn(usersService, 'findAll').mockResolvedValueOnce(result);

      const response = await usersController.findAll();
      expect(response.message).toBe('Ok');
      expect(response.inner).toBe(result);
      expect(response.error).toBeNull();
      expect(usersService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByPrimary', () => {
    it('should return user details by ID', async () => {
      const result = new Users();
      jest.spyOn(usersService, 'findByPrimary').mockResolvedValueOnce(result);

      const response = await usersController.findByPrimary('1');
      expect(response.message).toBe('Ok');
      expect(response.inner).toBe(result);
      expect(response.error).toBeNull();
      expect(usersService.findByPrimary).toHaveBeenCalledWith('1');
    });
  });

  describe('findByUsername', () => {
    it('should return user details by username', async () => {
      const result = new Users();
      jest.spyOn(usersService, 'findByUsername').mockResolvedValueOnce(result);

      const response = await usersController.findByUsername('testuser');
      expect(response.message).toBe('Ok');
      expect(response.inner).toBe(result);
      expect(response.error).toBeNull();
      expect(usersService.findByUsername).toHaveBeenCalledWith('testuser');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const body: BodyUsersDto = {
        username: 'updatedUser',
        password: 'newPass',
      };
      const result = new Users();
      jest.spyOn(usersService, 'update').mockResolvedValueOnce(result);

      const response = await usersController.update('1', body);
      expect(response.message).toBe('Ok');
      expect(response.inner).toBe(result);
      expect(response.error).toBeNull();
      expect(usersService.update).toHaveBeenCalledWith('1', body);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const result = new Users();
      jest.spyOn(usersService, 'delete').mockResolvedValueOnce(result);

      const response = await usersController.delete('1');
      expect(response.message).toBe('Ok');
      expect(response.inner).toBe(result);
      expect(response.error).toBeNull();
      expect(usersService.delete).toHaveBeenCalledWith('1');
    });
  });
});
