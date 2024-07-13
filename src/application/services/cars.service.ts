import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CarsRepository } from 'src/infraestructure/database/repositories/cars.repository';

@Injectable()
export class CarsService {
  constructor(
    private carRepository: CarsRepository,
  ) {}

  async create(createCatDto: any): Promise<any> {
    const createdCat = this.carRepository.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<any[]> {
    return this.carRepository.findAll();
  }
}