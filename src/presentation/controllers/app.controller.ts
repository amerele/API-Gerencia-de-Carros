import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { BodyUsersDto } from '../../application/DTOs/body-users.dto';
import { JsonResponse } from '../responses/json-response.contract';
import { UsersService } from '../../application/services/users.service';
import { Created, Ok } from '../responses/success.types';
import { Public } from '../decorators/public.decorator';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ description: 'Login DTO', type: BodyUsersDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  public async login(@Request() req): Promise<any> {
    const user = await this.authService.login(req.body);
    return Ok(user);
  }

  @Public()
  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ description: 'User DTO', type: BodyUsersDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  public async create(
    @Body() body: BodyUsersDto,
  ): Promise<JsonResponse<BodyUsersDto>> {
    const users = await this.usersService.create(body);
    return Created(users);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get welcome message' })
  @ApiResponse({ status: 200, description: 'Welcome message' })
  getHello(): string {
    return 'Developed by Bruno Gomes';
  }
}
