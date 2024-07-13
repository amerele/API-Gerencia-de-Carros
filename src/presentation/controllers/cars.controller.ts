import { Controller, Get, Res } from '@nestjs/common';
import { CarsService } from 'src/application/services/cars.service';

@Controller('/cats')
export class CarsController {
  constructor( 
    private readonly carsService: CarsService
  ) {}

  @Get('/')
  getHello() {
    return 'hello';
  }
  @Get('/teste')
  teste() {
    return this.carsService.findAll();
  }
}
