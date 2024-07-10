import { Controller, Get, Res } from '@nestjs/common';

@Controller('/cats')
export class CarsController {
  constructor() {}

  @Get('/')
  getHello() {
    return 'cars';
  }
}
