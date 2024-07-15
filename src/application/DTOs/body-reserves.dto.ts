import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Moment } from 'moment';

export class BodyReservesDto {
  @IsString()
  startDate: string | Moment;
  @IsString()
  carId: string;
  @IsString()
  endDate: string | Moment;
  @IsString()
  userId: string;
  @IsString()
  @IsOptional()
  username?: string;
  @IsString()
  @IsOptional()
  status?: string;

  constructor(
    startDate: string,
    carId: string,
    duration: string,
    userId: string,
    username: string,
    status: string,
  ) {
    this.startDate = startDate;
    this.carId = carId;
    this.endDate = duration;
    this.userId = userId;
    this.username = username;
    this.status = status;
  }
}
