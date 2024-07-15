import { Injectable } from '@nestjs/common';
import { BodyUsersDto } from '../DTOs/body-users.dto';
import { UsersRepository } from 'src/infraestructure/database/repositories/users.repository';
import { Error } from 'src/presentation/responses/error.types';
import { Users } from 'src/domain/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<Users[]> {
    try {
      return await this.usersRepository.findAll();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByPrimary(id: string): Promise<Users> {
    const user = await this.usersRepository.findByPrimary(id);
    if (!user) throw Error(404, 'User not found');
    try {
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByUsername(username: string): Promise<Users> {
    const user = await this.usersRepository.findByUsername(username);
    if (!user) throw Error(404, 'User not found');
    try {
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(bodyUsersDto: BodyUsersDto): Promise<BodyUsersDto> {
    bodyUsersDto.username = bodyUsersDto.username.toLowerCase() 

    const alreadyExists = await this.usersRepository.findByUsername(bodyUsersDto.username);
    if (alreadyExists) throw Error(409, 'This username already exists');
    
    try {
      return await this.usersRepository.create(bodyUsersDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async update(id: string, bodyUsersDto: Partial<BodyUsersDto>): Promise<BodyUsersDto> {
    await this.findByPrimary(id);
    try {
      await this.usersRepository.update(id, bodyUsersDto);
      return this.usersRepository.findByPrimary(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async delete(id: string): Promise<Users> {
    await this.findByPrimary(id);
    try {
      return this.usersRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
