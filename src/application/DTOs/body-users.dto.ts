import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class BodyUsersDto {
  @IsNumber()
  id: number;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  name: string;
  @IsString()
  lastName: string;
  @IsString()
  address: string;
  @IsString()
  zipcode: string;
  @IsString()
  phone: string;
  @IsString()
  emergencyPhone: string;

  constructor(
    id: number,
    email: string,
    password: string,
    name: string,
    lastName: string,
    address: string,
    zipcode: string,
    phone: string,
    emergencyPhone: string,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.address = address;
    this.zipcode = zipcode;
    this.phone = phone;
    this.emergencyPhone = emergencyPhone;
  }
}
 