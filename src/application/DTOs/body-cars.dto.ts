import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class BodyCarsDto {
  @IsNumber()
  year: number;
  @IsString()
  model: string;
  @IsString()
  categorie: string;
  @IsString()
  mileage: string;
  @IsBoolean()
  @IsOptional()
  avaliable: boolean;
  @IsBoolean()
  @IsOptional()
  reservedUser: string;

  constructor(year: number, model: string, categorie: string, mileage: string, avaliable: boolean, reservedUser: string) {
    this.year = year;
    this.model = model;
    this.categorie = categorie;
    this.mileage = mileage;
    this.avaliable = avaliable;
    this.reservedUser = reservedUser;
  }
}
