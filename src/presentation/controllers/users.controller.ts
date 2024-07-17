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
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Ok } from '../responses/success.types';
import { BodyUsersDto } from '../../application/DTOs/body-users.dto';
import { UsersService } from '../../application/services/users.service';
import { Users } from '../../domain/entities/users.entity';
import { JsonResponse } from '../responses/json-response.contract';


@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  public async findAll(): Promise<JsonResponse<Users[]>> {
    const users = await this.usersService.findAll();
    return Ok(users);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'User details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async findByPrimary(
    @Param('id') id: string,
  ): Promise<JsonResponse<Users[]>> {
    const users = await this.usersService.findByPrimary(id);
    return Ok(users);
  }

  @Get('/username/:username')
  @ApiOperation({ summary: 'Get user by username' })
  @ApiParam({ name: 'username', description: 'Username of the user' })
  @ApiResponse({ status: 200, description: 'User details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async findByUsername(
    @Param('username') username: string,
  ): Promise<JsonResponse<Users>> {
    const users = await this.usersService.findByUsername(username);
    return Ok(users);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', description: 'ID of the user to update' })
  @ApiBody({ description: 'User DTO', type: BodyUsersDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async update(
    @Param('id') id: string,
    @Body() body: BodyUsersDto,
  ): Promise<JsonResponse<BodyUsersDto>> {
    const users = await this.usersService.update(id, body);
    return Ok(users);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', description: 'ID of the user to delete' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  public async delete(@Param('id') id: string): Promise<JsonResponse<Users>> {
    const users = await this.usersService.delete(id);
    return Ok(users);
  }
}
