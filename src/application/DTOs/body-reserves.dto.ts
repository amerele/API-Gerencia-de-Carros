import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Moment } from 'moment';

export class BodyReservesDto {
  @IsString()
  @ApiProperty({ description: 'Start date of the reservation', type: String })
  startDate: string | Moment;

  @IsString()
  @ApiProperty({ description: 'ID of the car being reserved' })
  carId: string;

  @IsString()
  @ApiProperty({ description: 'End date of the reservation', type: String })
  endDate: string | Moment;

  @IsString()
  @ApiProperty({ description: 'ID of the user making the reservation' })
  userId: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Username of the user making the reservation' })
  username?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Status of the reservation' })
  status?: string;

  constructor(
    startDate: string,
    carId: string,
    endDate: string,
    userId: string,
    username?: string,
    status?: string,
  ) {
    this.startDate = startDate;
    this.carId = carId;
    this.endDate = endDate;
    this.userId = userId;
    this.username = username;
    this.status = status;
  }
}
