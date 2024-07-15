import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Cars } from 'src/domain/entities/cars.entity';
import { BodyCarsDto } from 'src/application/DTOs/body-cars.dto';

@Injectable()
export class CarsRepository {
  constructor(
    @Inject('CAR_MODEL')
    private carModel: Model<Cars>,
  ) {}

  async findAll(): Promise<Cars[]> {
    return await this.carModel.find();
  }
  async findAvaliable(): Promise<any[]> {
    return await this.carModel.where({avaliable: true}).find();
  }
  async findByPrimary(id: string): Promise<Cars> {
    try {
      return await this.carModel.findById(id).exec();
    } catch (error) {
      return null;
    }
  }
  async validateAvaliability(id: string): Promise<Cars | string> {
    try {
      return await this.carModel.findById(id).where({avaliable: true}).exec();
    } catch (error) {
      return '';
    }
  }
  async findByUser(reservedUser: string): Promise<Cars> {
    return await this.carModel.findOne({ reservedUser });
  }
  async create(carBodyDto: BodyCarsDto): Promise<Cars> {
    const createdCar = new this.carModel(carBodyDto);
    return await createdCar.save();
  }
  async update(id: string, carBodyDto: any): Promise<BodyCarsDto> {
    return await this.carModel.findByIdAndUpdate(id, carBodyDto);
  }
  async delete(id: string): Promise<Cars> {
    return this.carModel.findByIdAndDelete(id);
  }
}
