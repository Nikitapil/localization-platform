import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { CreateUserDto } from '../user/dto/Requests/CreateUserDto';
import { AuthService } from './auth.service';
import { UserWithTokenData } from './types';
import { REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE_TIME } from './constants';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthUserResponse } from './dto/Responses/AuthUserResponse';
import { LoginDto } from './dto/Requests/LoginDto';
import { Cookies } from '../../decorators/Cookies.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private async useAuthMethod(res: Response, method: () => Promise<UserWithTokenData>) {
    const { user, refreshToken, accessToken } = await method();

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: REFRESH_TOKEN_MAX_AGE_TIME
    });

    return { user, accessToken };
  }

  @ApiOperation({ summary: 'Register a new user', operationId: 'register' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered.',
    type: AuthUserResponse
  })
  @Post('register')
  register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
    return this.useAuthMethod(res, () => this.authService.register(dto));
  }

  @Post('login')
  login(@Body() dto: LoginDto, @Res() res: Response) {
    return this.useAuthMethod(res, () => this.authService.login(dto));
  }

  @Get('refresh')
  refresh(@Cookies(REFRESH_TOKEN_COOKIE_NAME) refreshToken: string, @Res({ passthrough: true }) res: Response) {
    return this.useAuthMethod(res, () => this.authService.refresh(refreshToken));
  }

  @Delete('logout')
  logout() {}
}
