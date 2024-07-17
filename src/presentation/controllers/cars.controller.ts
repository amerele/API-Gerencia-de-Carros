import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CarsService } from '../../application/services/cars.service';
import { Ok } from '../responses/success.types';
import { Cars } from '../../domain/entities/cars.entity';
import { JsonResponse } from '../responses/json-response.contract';
import { BodyCarsDto } from '../../application/DTOs/body-cars.dto';

@ApiTags('Cars')
@Controller('/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all cars' })
  @ApiResponse({ status: 200, description: 'List of all cars' })
  public async findAll(): Promise<JsonResponse<Cars[]>> {
    const car = await this.carsService.findAll();
    return Ok(car);
  }

  @Get('/param')
  @ApiOperation({ summary: 'Find cars by custom params' })
  @ApiResponse({ status: 200, description: 'List of cars by params' })
  public async findByParam(
    @Query('year') year?: number,
    @Query('model') model?: string,
    @Query('categorie') categorie?: string,
    @Query('mileage') mileage?: string,
    @Query('avaliable') avaliable?: boolean,
    @Query('reservedUser') reservedUser?: string,
  ): Promise<JsonResponse<Cars[]>> {
    const filters = {year, model, categorie, mileage, avaliable, reservedUser}
    const car = await this.carsService.findByParam(filters);
    return Ok(car);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get car by ID' })
  @ApiParam({ name: 'id', description: 'ID of the car' })
  @ApiResponse({ status: 200, description: 'Car details' })
  @ApiResponse({ status: 404, description: 'Car not found' })
  public async findByPrimary(
    @Param('id') id: string,
  ): Promise<JsonResponse<Cars>> {
    const car = await this.carsService.findByPrimary(id);
    return Ok(car);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new car' })
  @ApiBody({ description: 'Car DTO', type: BodyCarsDto })
  @ApiResponse({ status: 201, description: 'Car created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  public async create(
    @Body() carBodyDto: BodyCarsDto,
  ): Promise<JsonResponse<Cars>> {
    const car = await this.carsService.create(carBodyDto);
    return Ok(car);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update car details' })
  @ApiParam({ name: 'id', description: 'ID of the car to update' })
  @ApiBody({ description: 'Car DTO', type: BodyCarsDto })
  @ApiResponse({ status: 200, description: 'Car updated successfully' })
  @ApiResponse({ status: 404, description: 'Car not found' })
  public async update(
    @Param('id') id: string,
    @Body() carBodyDto: BodyCarsDto,
  ): Promise<JsonResponse<Cars>> {
    const car = await this.carsService.update(id, carBodyDto);
    return Ok(car);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete car by ID' })
  @ApiParam({ name: 'id', description: 'ID of the car to delete' })
  @ApiResponse({ status: 200, description: 'Car deleted successfully' })
  @ApiResponse({ status: 404, description: 'Car not found' })
  public async delete(@Param('id') id: string): Promise<JsonResponse<Cars>> {
    const car = await this.carsService.delete(id);
    return Ok(car);
  }
}
