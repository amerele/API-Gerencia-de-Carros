import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CarsRepository {
  constructor(
    @Inject('CAR_MODEL')
    private carModel: Model<any>,
  ) {}

  async findAll(): Promise<any[]> {
    return await this.carModel.find();
  }
  async findAvaliable(): Promise<any[]> {
    return await this.carModel.where({avaliable: true}).find();
  }
  async findByPrimary(id: string): Promise<any[]> {
    try {
      return await this.carModel.findById(id).exec();
    } catch (error) {
      return null;
    }
  }
  async validateAvaliability(id: string): Promise<any> {
    try {
      return await this.carModel.findById(id).where({avaliable: true}).exec();
    } catch (error) {
      return '';
    }
  }
  async findByUser(reservedUser: string): Promise<any[]> {
    return await this.carModel.findOne({ reservedUser });
  }
  async findByCombination(id: number): Promise<any[]> {
    return await this.carModel.findById(id);
  }
  async create(carBodyDto: any): Promise<any> {
    const createdCar = new this.carModel(carBodyDto);
    return await createdCar.save();
  }
  async update(id: string, carBodyDto: any): Promise<any> {
    return await this.carModel.findByIdAndUpdate(id, carBodyDto);
  }
  async delete(id: string): Promise<any> {
    return this.carModel.findByIdAndDelete(id);
  }
}
