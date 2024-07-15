import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CarsService } from 'src/application/services/cars.service';
import { Ok } from '../responses/success.types';
import { Cars } from 'src/domain/entities/cars.entity';
import { JsonResponse } from '../responses/json-response.contract';
import { BodyCarsDto } from 'src/application/DTOs/body-cars.dto';

@Controller('/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('')
  public async findAll(): Promise<JsonResponse<Cars[]>> {
    const car = await this.carsService.findAll();
    return Ok(car);
  }
  @Get('/avaliables')
  public async findAvaliable(): Promise<JsonResponse<Cars[]>> {
    const car = await this.carsService.findAvaliable();
    return Ok(car);
  }
  @Get(':id')
  public async findByPrimary(
    @Param('id') id: string,
  ): Promise<JsonResponse<Cars>> {
    const car = await this.carsService.findByPrimary(id);
    return Ok(car);
  }
  @Get('/user/:user')
  public async findByUser(
    @Param('user') reservedUser: string,
  ): Promise<JsonResponse<Cars>> {
    const car = await this.carsService.findByUser(reservedUser);
    return Ok(car);
  }

  @Post()
  public async create(@Body() carBodyDto: BodyCarsDto): Promise<JsonResponse<Cars>> {
    const car = await this.carsService.create(carBodyDto);
    return Ok(car);
  }
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() carBodyDto: BodyCarsDto,
  ): Promise<JsonResponse<Cars>> {
    const car = await this.carsService.update(id, carBodyDto);
    return Ok(car);
  }
  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<JsonResponse<Cars>> {
    const car = await this.carsService.delete(id);
    return Ok(car);
  }
}
