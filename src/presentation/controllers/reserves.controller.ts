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
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { ReserveService } from '../../application/services/reserves.service';
import { Ok } from '../responses/success.types';
import { JsonResponse } from '../responses/json-response.contract';
import { Reserves } from '../../domain/entities/reserves.entity';
import { BodyReservesDto } from '../../application/DTOs/body-reserves.dto';

@ApiTags('Reserves')
@Controller('/reserves')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reserves' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Status of the reserves',
  })
  @ApiResponse({ status: 200, description: 'List of all reserves' })
  public async findAll(
    @Query('status') status?: string,
  ): Promise<JsonResponse<Reserves[]>> {
    const reserve = await this.reserveService.findAllReserves(status);
    return Ok(reserve);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get reserves by user ID' })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Status of the reserves',
  })
  @ApiResponse({ status: 200, description: 'List of reserves by user ID' })
  public async findReserveByUser(
    @Param('id') id: string,
    @Query('status') status?: string,
  ): Promise<JsonResponse<Reserves[]>> {
    const reserve = await this.reserveService.findReserveByUser(id, status);
    return Ok(reserve);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get reserve by ID' })
  @ApiParam({ name: 'id', description: 'ID of the reserve' })
  @ApiResponse({ status: 200, description: 'Details of the reserve' })
  @ApiResponse({ status: 404, description: 'Reserve not found' })
  public async findByPrimary(
    @Param('id') id: string,
  ): Promise<JsonResponse<Reserves>> {
    const reserve = await this.reserveService.findByPrimary(id);
    return Ok(reserve);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new reserve' })
  @ApiBody({ description: 'Reserve DTO', type: BodyReservesDto })
  @ApiResponse({ status: 201, description: 'Reserve created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  public async reserve(
    @Body() bodyReserveDto: BodyReservesDto,
  ): Promise<JsonResponse<Reserves>> {
    const reserve = await this.reserveService.reserve(bodyReserveDto);
    return Ok(reserve);
  }

  @Post('/complete/:id')
  @ApiOperation({ summary: 'Set a reserve as "completed"' })
  @ApiParam({ name: 'id', description: 'ID of the reserve to complete' })
  @ApiResponse({ status: 200, description: 'Reserve completed successfully' })
  @ApiResponse({ status: 404, description: 'Reserve not found' })
  public async completeReserve(
    @Param('id') id: string,
  ): Promise<JsonResponse<Reserves>> {
    const reserve = await this.reserveService.completeReserve(id);
    return Ok(reserve);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a reserve' })
  @ApiParam({ name: 'id', description: 'ID of the reserve to update' })
  @ApiBody({ description: 'Reserve DTO', type: BodyReservesDto })
  @ApiResponse({ status: 200, description: 'Reserve updated successfully' })
  @ApiResponse({ status: 404, description: 'Reserve not found' })
  public async update(
    @Param('id') id: string,
    @Body() bodyReserveDto: BodyReservesDto,
  ): Promise<JsonResponse<Reserves>> {
    const reserve = await this.reserveService.update(id, bodyReserveDto);
    return Ok(reserve);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reserve' })
  @ApiParam({ name: 'id', description: 'ID of the reserve to delete' })
  @ApiResponse({ status: 200, description: 'Reserve deleted successfully' })
  @ApiResponse({ status: 404, description: 'Reserve not found' })
  public async delete(
    @Param('id') id: string,
  ): Promise<JsonResponse<Reserves>> {
    const reserve = await this.reserveService.delete(id);
    return Ok(reserve);
  }
}
