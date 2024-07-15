import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { BodyUsersDto } from 'src/application/DTOs/body-users.dto';
import { Users } from 'src/domain/entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<BodyUsersDto>,
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userModel.find();
  }
  async findByPrimary(id: string): Promise<Users> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      return null;
    }
  }
  async findByUsername(username: string): Promise<Users> {
    try {
      return await this.userModel.findOne({ username });
    } catch (error) {
      return null;
    }
  }
  async create(bodyUsersDto: BodyUsersDto): Promise<BodyUsersDto> {
    const createdUser = new this.userModel(bodyUsersDto);
    return await createdUser.save();
  }
  async update(id: string, bodyUsersDto: Partial<BodyUsersDto>): Promise<BodyUsersDto> {
    return await this.userModel.findByIdAndUpdate(id, bodyUsersDto);
  }
  async delete(id: string): Promise<Users> {
    return this.userModel.findByIdAndDelete(id);
  }
}
