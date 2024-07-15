import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { BodyUsersDto } from 'src/application/DTOs/body-users.dto';
import { JsonResponse } from '../responses/json-response.contract';
import { UsersService } from 'src/application/services/users.service';
import { Created, Ok } from '../responses/success.types';
import { Public } from '../decorators/public.decorator';
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('/login')
  public async login(@Request() req): Promise<any> {
    const user = await this.authService.login(req.body);
    return Ok(user);
  }
  @Public()
  @Post('/register')
  public async create(
    @Body() body: BodyUsersDto,
  ): Promise<JsonResponse<BodyUsersDto>> {
    const users = await this.usersService.create(body);
    return Created(users);
  }

  @Public()
  @Get()
  getHello() {
    return 'Developed by Bruno Gomes';
  }
}
