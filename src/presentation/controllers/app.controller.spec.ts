import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../application/services/users.service';
import { BodyUsersDto } from '../../application/DTOs/body-users.dto';

describe('AppController', () => {
  let appController: AppController;
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ token: 'test-token' }),
          },
        },
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue('test-user'),
          },
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    authService = moduleRef.get<AuthService>(AuthService);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const req = { body: { username: 'test', password: 'test' } };
      const result = await appController.login(req);
      expect(result.inner.token).toBe('test-token');
      expect(authService.login).toHaveBeenCalledWith(req.body);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const body: BodyUsersDto = { username: 'test', password: 'test' };
      const result = await appController.create(body);
      expect(result.inner).toBe('test-user');
      expect(usersService.create).toHaveBeenCalledWith(body);
    });
  });

  describe('getHello', () => {
    it('should return a welcome message', () => {
      expect(appController.getHello()).toBe('Developed by Bruno Gomes');
    });
  });
});
