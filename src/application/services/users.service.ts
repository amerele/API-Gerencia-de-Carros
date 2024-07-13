import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { BodyUsersDto } from '../DTOs/body-users.dto';


@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<BodyUsersDto>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.userModel.find().exec();
  }
  async findByUsername(username: string): Promise<any[]> {
    return await this.userModel.findOne({ username });
  }

  async create(createCarDto: any): Promise<any> {
    const createdCar = new this.userModel(createCarDto);
    return createdCar.save();
  }
  async update(createCarDto: any): Promise<any> {
    const createdCar = new this.userModel(createCarDto);
    return createdCar.save();
  }
  async delete(createCarDto: any): Promise<any> {
    const createdCar = new this.userModel(createCarDto);
    return createdCar.save();
  }
  
}
