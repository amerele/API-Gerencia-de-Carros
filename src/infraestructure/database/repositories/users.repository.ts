import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { BodyUsersDto } from 'src/application/DTOs/body-users.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<BodyUsersDto>,
  ) {}

  async findAll(): Promise<any[]> {
    return await this.userModel.find();
  }
  async findByPrimary(id: string): Promise<any[]> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      return null;
    }
  }
  async create(bodyUsersDto: BodyUsersDto): Promise<any> {
    const createdUser = new this.userModel(bodyUsersDto);
    return await createdUser.save();
  }
  async update(id: string, bodyUsersDto: Partial<BodyUsersDto>): Promise<any> {
    return await this.userModel.findByIdAndUpdate(id, bodyUsersDto);
  }
  async delete(id: number): Promise<any> {
    return this.userModel.findByIdAndDelete(id);
  }
}
