import { IsBoolean, IsNumber, IsString,  } from 'class-validator';

export class BodyUsersDto {
  @IsString()
  username: string;
  @IsString()
  password: string;

  constructor(
    username: string,
    password: string
  ) {
    this.username = username;
    this.password = password;
  }
}
 