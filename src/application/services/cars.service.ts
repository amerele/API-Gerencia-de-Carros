import { Injectable } from '@nestjs/common';
import { CarsRepository } from 'src/infraestructure/database/repositories/cars.repository';
import { Error } from 'src/presentation/responses/error.types';
import { UsersService } from './users.service';

@Injectable()
export class CarsService {
  constructor(
    private carRepository: CarsRepository,
    private userService: UsersService,
  ) {}

  async findAll(): Promise<any[]> {
    try {
      return await this.carRepository.findAll();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByPrimary(id: string): Promise<any> {
    const car = await this.carRepository.findByPrimary(id);
    if (!car) throw Error(404, 'Car not found');
    try {
      return car;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByUser(reservedUser: string): Promise<any[]> {
    /* onst user = await this.userService.findByUsername(reservedUser);
    if (!user) throw Error(404, 'User not found'); */
    try {
      return await this.carRepository.findByUser(reservedUser);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async create(carBodyDto: any): Promise<any> {
    try {
      return await this.carRepository.create(carBodyDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async update(id: string, carBodyDto: any): Promise<any> {
    try {
      await this.carRepository.update(id, carBodyDto);
      return this.carRepository.findByPrimary(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async delete(createCatDto: any): Promise<any> {
    try {
      return this.carRepository.delete(createCatDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
