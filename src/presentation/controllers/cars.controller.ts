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

@Controller('/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('')
  public async findAll() {
    const car = await this.carsService.findAll();
    return Ok(car);
  }
  @Get('/avaliables')
  public async findAvaliable() {
    const car = await this.carsService.findAvaliable();
    return Ok(car);
  }
  @Get(':id')
  public async findByPrimary(@Param('id') id: string) {
    const car = await this.carsService.findByPrimary(id);
    return Ok(car);
  }
  @Get('/user/:user')
  public async findByUser(@Param('user') reservedUser: string) {
    const car = await this.carsService.findByUser(reservedUser);
    return Ok(car);
  }

  @Post()
  public async create(@Body() carBodyDto: any) {
    //implementar dto de cars
    const car = await this.carsService.create(carBodyDto);
    return Ok(car);
  }
  @Put(':id')
  public async update(@Param('id') id: string, @Body() carBodyDto: any) {
    //implementar dto de cars
    const car = await this.carsService.update(id, carBodyDto);
    return Ok(car);
  }
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const car = await this.carsService.delete(id);
    return Ok(car);
  }
}
