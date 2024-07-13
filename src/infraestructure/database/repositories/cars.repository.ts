import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CarsRepository {
  constructor(
    @Inject('CAR_MODEL')
    private catModel: Model<any>,
  ) {}

  async create(createCatDto: any): Promise<any> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<any[]> {
    return this.catModel.find().exec();
  }
}