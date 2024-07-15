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
import { Users } from 'src/domain/entities/users.entity';
import { JsonResponse } from '../responses/json-response.contract';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAll(): Promise<JsonResponse<Users[]>> {
    const users = await this.usersService.findAll();
    return Ok(users);
  }
  @Get(':id')
  public async findByPrimary(
    @Param('id') id: string,
  ): Promise<JsonResponse<Users[]>> {
    const users = await this.usersService.findByPrimary(id);
    return Ok(users);
  }
  @Get('/username/:username')
  public async findByUsername(
    @Param('username') username: string,
  ): Promise<JsonResponse<Users>> {
    const users = await this.usersService.findByUsername(username);
    return Ok(users);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() body: BodyUsersDto,
  ): Promise<JsonResponse<BodyUsersDto>> {
    const users = await this.usersService.update(id, body);
    return Ok(users);
  }
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<JsonResponse<Users>> {
    const users = await this.usersService.delete(id);
    return Ok(users);
  }
}
