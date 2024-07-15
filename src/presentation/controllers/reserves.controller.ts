import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ReserveService } from 'src/application/services/reserves.service';
import { Ok } from '../responses/success.types';
import { JsonResponse } from '../responses/json-response.contract';
import { Reserves } from 'src/domain/entities/reserves.entity';
import { BodyReservesDto } from 'src/application/DTOs/body-reserves.dto';

@Controller('/reserves')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Get()
  public async findAll(
    @Query('status') status?: string,
  ): Promise<JsonResponse<Reserves[]>> {
    const reserve = await this.reserveService.findAllReserves(status);
    return Ok(reserve);
  }
  @Get('user/:id')
  public async findReserveByUser(
    @Param('id') id: string,
    @Query('status') status?: string,
  ): Promise<JsonResponse<Reserves[]>> {
    const reserve = await this.reserveService.findReserveByUser(id, status);
    return Ok(reserve);
  }
  @Get(':id')
  public async findByPrimary(
    @Param('id') id: string,
  ): Promise<JsonResponse<Reserves>> {
    const reserve = await this.reserveService.findByPrimary(id);
    return Ok(reserve);
  }

  @Post()
  public async reserve(
    @Body() bodyReserveDto: BodyReservesDto,
  ): Promise<JsonResponse<Reserves>> {
    const reserve = await this.reserveService.reserve(bodyReserveDto);
    return Ok(reserve);
  }
  @Post('/complete/:id')
  public async completeReserve(
    @Param('id') id: string,
  ): Promise<JsonResponse<Reserves>> {
    const reserve = await this.reserveService.completeReserve(id);
    return Ok(reserve);
  }
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() bodyReserveDto: BodyReservesDto,
  ): Promise<JsonResponse<Reserves>> {
    const reserve = await this.reserveService.update(id, bodyReserveDto);
    return Ok(reserve);
  }
  @Delete(':id')
  public async delete(
    @Param('id') id: number,
  ): Promise<JsonResponse<Reserves>> {
    const reserve = await this.reserveService.delete(id);
    return Ok(reserve);
  }
}
