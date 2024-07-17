import { Test, TestingModule } from '@nestjs/testing';
import { ReserveController } from './reserves.controller';
import { ReserveService } from '../../application/services/reserves.service';
import { BodyReservesDto } from '../../application/DTOs/body-reserves.dto';
import { Reserves } from '../../domain/entities/reserves.entity';

describe('ReserveController', () => {
  let reserveController: ReserveController;
  let reserveService: ReserveService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ReserveController],
      providers: [
        {
          provide: ReserveService,
          useValue: {
            findAllReserves: jest.fn().mockResolvedValue([]),
            findReserveByUser: jest.fn().mockResolvedValue([]),
            findByPrimary: jest.fn().mockResolvedValue(null),
            reserve: jest.fn().mockResolvedValue({}),
            completeReserve: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    reserveController = moduleRef.get<ReserveController>(ReserveController);
    reserveService = moduleRef.get<ReserveService>(ReserveService);
  });

  describe('findAll', () => {
    it('should return a list of all reserves', async () => {
      const response = await reserveController.findAll();

      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(reserveService.findAllReserves).toHaveBeenCalled();
      expect(response.inner).toEqual([]);
    });
  });

  describe('findReserveByUser', () => {
    it('should return a list of reserves by user ID', async () => {
      const status: string = 'ongoing';
      const reserves = [{ userId: 'user1', status }] as Reserves[];

      jest
        .spyOn(reserveService, 'findReserveByUser')
        .mockResolvedValueOnce(reserves);

      const response = await reserveController.findReserveByUser(
        'user1',
        status,
      );

      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(reserveService.findReserveByUser).toHaveBeenCalledWith(
        'user1',
        status,
      );
      expect(response.inner).toEqual(reserves);
    });
  });

  describe('findByPrimary', () => {
    it('should return a reserve by ID', async () => {
      const result = new Reserves();
      jest.spyOn(reserveService, 'findByPrimary').mockResolvedValueOnce(result);
      const response = await reserveController.findByPrimary('1');
      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();

      expect(reserveService.findByPrimary).toHaveBeenCalledWith('1');
    });
  });

  describe('reserve', () => {
    it('should create a new reserve', async () => {
      const reserveDto = new BodyReservesDto(
        '2023-07-12',
        'car1',
        '2023-07-14',
        'user1',
        'username',
        'status',
      );
      jest.spyOn(reserveService, 'reserve').mockResolvedValueOnce(reserveDto);
      const response = await reserveController.reserve(reserveDto);
      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(reserveService.reserve).toHaveBeenCalledWith(reserveDto);
    });
  });

  describe('completeReserve', () => {
    it('should complete a reserve by ID', async () => {
      const response = await reserveController.completeReserve('1');
      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(reserveService.completeReserve).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a reserve by ID', async () => {
      const result = new Reserves();
      const reserveDto = new BodyReservesDto(
        '2023-07-12',
        'car1',
        '2023-07-14',
        'user1',
        'username',
        'status',
      );
      jest.spyOn(reserveService, 'update').mockResolvedValueOnce(result);
      const response = await reserveController.update('1', reserveDto);
      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(reserveService.update).toHaveBeenCalledWith('1', reserveDto);
    });
  });

  describe('update', () => {
    it('should update a reserve by ID', async () => {
      const result = new Reserves();
      const reserveDto = new BodyReservesDto(
        '2023-07-12',
        'car1',
        '2023-07-14',
        'user1',
        'username',
        'status',
      );
      jest.spyOn(reserveService, 'update').mockResolvedValueOnce(result);
      const response = await reserveController.update('1', reserveDto);
      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(reserveService.update).toHaveBeenCalledWith('1', reserveDto);
    });
  });
  describe('delete', () => {
    it('should delete a reserve by ID', async () => {
      const result = new Reserves();
      jest.spyOn(reserveService, 'delete').mockResolvedValueOnce(result);
      const response = await reserveController.delete('1');
      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(reserveService.delete).toHaveBeenCalledWith('1');
    });
  });
});
