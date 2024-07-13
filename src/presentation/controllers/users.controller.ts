import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Created, Ok } from '../responses/success.types';
import { BodyUsersDto } from 'src/application/DTOs/body-users.dto';
import { UsersService } from 'src/application/services/users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAll() {
    const users = this.usersService.findAll();
    return Ok(users);
  }
  @Get(':id')
  public async findByPrimary(@Param('id') id: string) {
    const users = this.usersService.findByPrimary(id);
    return Ok(users);
  }
  @Get()
  public async findByUsername(@Param('username') username: string) {
    const users = this.usersService.findByUsername(username);
    return Ok(users);
  }
  @Post()
  public async create(@Body() body: BodyUsersDto) {
    const users = this.usersService.create(body);
    return users;
  }
  @Put(':id')
  public async update(@Param('id') id: string, @Body() body: BodyUsersDto) {
    const users = this.usersService.update(id, body);
    return Ok(users);
  }
  @Delete()
  public async delete(@Param('id') id: number) {
    const users = this.usersService.delete(id);
    return Ok(users);
  }
}
