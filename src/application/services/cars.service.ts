import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CarsService {
  constructor(
    @Inject('cars')
    private carModel: Model<any>,
  ) {}

  async create(createCarDto: any): Promise<any> {
    const createdCar = new this.carModel(createCarDto);
    return createdCar.save();
  }

  async findAll(): Promise<any[]> {
    return this.carModel.find().exec();
  }
}