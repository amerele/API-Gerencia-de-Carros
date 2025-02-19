import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BodyUsersDto {
  @IsString()
  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @IsString()
  @ApiProperty({ description: 'The password of the user' })
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
