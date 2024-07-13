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
  constructor( 
    private readonly usersService: UsersService
  ) {}
  
  @Get()
  public async findAll() {
    const users = this.usersService.findAll();
    return Ok(users);
  }
  @Get()
  public async findByUsername(@Param('id') username: string) {
    const users = this.usersService.findByUsername(username);
    return Ok(users);
  }
  @Post()
  public async create(
    @Body() body: BodyUsersDto,
    @Param('id') id: number) {
    const users = this.usersService.create(body);
    return users
  }
  @Put()
  public async update(@Body() body: BodyUsersDto, id: number) {
    const users = this.usersService.update(body);
    return Ok(users);
  }
  @Delete()
  public async delete(@Param('id') id: number) {
    const users = this.usersService.delete(
      id,
    );
    return Ok(users);
  }
}

 