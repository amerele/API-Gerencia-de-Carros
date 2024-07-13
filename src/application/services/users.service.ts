import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { BodyUsersDto } from '../DTOs/body-users.dto';
import { UsersRepository } from 'src/infraestructure/database/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAll(): Promise<any[]> {
    try {
      return await this.usersRepository.findAll();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByPrimary(id: string): Promise<any> {
    try {
      const user = await this.usersRepository.findByPrimary(id);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByUsername(username: string): Promise<any> {
    try {
      const user = await this.usersRepository.findByPrimary(username);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(bodyUsersDto: BodyUsersDto): Promise<any> {
    try {
      return await this.usersRepository.create(bodyUsersDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async update(id: string, bodyUsersDto: Partial<BodyUsersDto>): Promise<any> {
    try {
      await this.usersRepository.update(id, bodyUsersDto);
      return this.usersRepository.findByPrimary(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async delete(createCatDto: any): Promise<any> {
    try {
      return this.usersRepository.delete(createCatDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
