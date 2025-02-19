import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../application/services/users.service';
import { Users } from '../domain/entities/users.entity';
import { Error } from '../presentation/responses/error.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }): Promise<any> {
    const user: Users = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      return user;
    }
    throw Error(401, 'Wrong password');
  }

  async login(req: any) {
    const { username, password, _id } = await this.validateUser(req);
    const payload = { username, password };

    return {
      username,
      id: _id,
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_KEY,
      }),
    };
  }
}
