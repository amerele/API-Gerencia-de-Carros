import { Injectable } from '@nestjs/common';
import { CarsRepository } from '../../infraestructure/database/repositories/cars.repository';
import { Error } from '../../presentation/responses/error.types';
import { Cars } from '../../domain/entities/cars.entity';
import { BodyCarsDto } from '../DTOs/body-cars.dto';

@Injectable()
export class CarsService {
  constructor(private carRepository: CarsRepository) {}

  async findAll(): Promise<Cars[]> {
    try {
      return await this.carRepository.findAll();
    } catch (error) {
      console.log(error);
      throw Error(500, error.message);
    }
  }
  async findByParam(filters?: Cars): Promise<Cars[]> {
    const appliedFilters = Object.keys(filters)
      .filter((key) => filters[key] && filters[key] !== undefined)
      .reduce((acc, key) => {
        acc[key] = filters[key].toLowerCase();
        return acc;
      }, {});
    try {
      return await this.carRepository.findByParam(appliedFilters);
    } catch (error) {
      console.log(error);
      throw Error(500, error.message);
    }
  }
  async findByPrimary(id: string): Promise<Cars> {
    const car = await this.carRepository.findByPrimary(id);
    if (!car) throw Error(404, 'Car not found');
    try {
      return car;
    } catch (error) {
      console.log(error);
      throw Error(500, error.message);
    }
  }
  async validateAvaliability(id: string): Promise<Cars | string> {
    await this.findByPrimary(id);
    const car = await this.carRepository.validateAvaliability(id);
    if (!car) throw Error(400, 'This car is not avaliable');

    try {
      return car;
    } catch (error) {
      console.log(error);
      throw Error(500, error.message);
    }
  }
  async create(carBodyDto: BodyCarsDto): Promise<Cars> {
    try {
      return await this.carRepository.create(carBodyDto);
    } catch (error) {
      console.log(error);
      throw Error(500, error.message);
    }
  }
  async update(id: string, carBodyDto: Partial<BodyCarsDto>): Promise<Cars> {
    try {
      await this.carRepository.update(id, carBodyDto);
      return this.carRepository.findByPrimary(id);
    } catch (error) {
      console.log(error);
      throw Error(500, error.message);
    }
  }
  async delete(id: string): Promise<Cars> {
    try {
      return this.carRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw Error(500, error.message);
    }
  }
}
