import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/application/services/users.service';
import { Error } from 'src/presentation/responses/error.types';
import { IJsonResponse } from 'src/presentation/responses/json-response.contract';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }): Promise<any> {
    const user: any = await this.usersService.findByUsername(username);

    if (!user) throw Error(404, 'There is no user with this email');

    if (user && user.password === password) {
      return user;
    }
    throw Error(401, 'Wrong password');
  }

  async login(req: any) {
    const { name, id } = await this.validateUser(req);
    const payload = { name, id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_KEY,
      }),
    };
  }
}
