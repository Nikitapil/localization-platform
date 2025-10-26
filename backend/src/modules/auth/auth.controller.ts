import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/Requests/CreateUserDto';

@Controller('auth')
export class AuthController {
  @Post('register')
  register(@Body() dto: CreateUserDto) {}

  @Post('login')
  login() {}

  @Get('refresh')
  refresh() {}
}
