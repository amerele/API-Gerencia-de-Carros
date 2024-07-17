import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from '../../application/services/cars.service';
import { BodyCarsDto } from '../../application/DTOs/body-cars.dto';
import { Cars } from '../../domain/entities/cars.entity';

describe('CarsController', () => {
  let carsController: CarsController;
  let carsService: CarsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [
        {
          provide: CarsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findByParam: jest.fn().mockResolvedValue([]),
            findByPrimary: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    carsController = moduleRef.get<CarsController>(CarsController);
    carsService = moduleRef.get<CarsService>(CarsService);
  });

  describe('findAll()', () => {
    it('should return a list of all cars in the database', async () => {
      const response = await carsController.findAll();
      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(carsService.findAll).toHaveBeenCalled();
      expect(response.inner).toEqual([]);
    });
  });

  describe('findByParam()', () => {
    it('should return a list of cars by params', async () => {
      const response = await carsController.findByParam();
      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(carsService.findByParam).toHaveBeenCalled();
      expect(response.inner).toEqual([]);
    });
  });

  describe('findByPrimary()', () => {
    it('should return a car by ID', async () => {
      const result = new Cars();
      jest.spyOn(carsService, 'findByPrimary').mockResolvedValueOnce(result);
      const response = await carsController.findByPrimary('1');
      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(carsService.findByPrimary).toHaveBeenCalledWith('1');
      expect(response.inner).toEqual(result);
    });
  });

  describe('create()', () => {
    it('should create a new car', async () => {
      const result = new Cars();
      jest.spyOn(carsService, 'create').mockResolvedValueOnce(result);
      const response = await carsController.create(result);
      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(carsService.create).toHaveBeenCalledWith(result);
      expect(response.inner).toEqual(result);
    });
  });

  describe('update()', () => {
    it('should update a car by ID', async () => {
      const result = new Cars();
      jest.spyOn(carsService, 'update').mockResolvedValueOnce(result);
      const response = await carsController.update('1', result);
      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(carsService.update).toHaveBeenCalledWith('1', result);
      expect(response.inner).toEqual(result);
    });
  });

  describe('delete()', () => {
    it('should delete a car by ID', async () => {
      const result = new Cars();
      jest.spyOn(carsService, 'delete').mockResolvedValueOnce(result);
      const response = await carsController.delete('1');
      expect(response.message).toBe('Ok');
      expect(response.inner).toBeDefined();
      expect(response.error).toBeNull();
      expect(carsService.delete).toHaveBeenCalledWith('1');
      expect(response.inner).toEqual(result);
    });
  });
});
