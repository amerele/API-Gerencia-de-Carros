import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BodyCarsDto {
  @IsNumber()
  @ApiProperty({ description: 'The year of the car' })
  year: number;

  @IsString()
  @ApiProperty({ description: 'The model of the car' })
  model: string;

  @IsString()
  @ApiProperty({ description: 'The category of the car' })
  categorie: string;

  @IsString()
  @ApiProperty({ description: 'The mileage of the car' })
  mileage: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ description: 'The availability status of the car' })
  avaliable: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'The user who reserved the car' })
  reservedUser: string;

  constructor(
    year: number,
    model: string,
    categorie: string,
    mileage: string,
    avaliable: boolean,
    reservedUser: string,
  ) {
    this.year = year;
    this.model = model;
    this.categorie = categorie;
    this.mileage = mileage;
    this.avaliable = avaliable;
    this.reservedUser = reservedUser;
  }
}
