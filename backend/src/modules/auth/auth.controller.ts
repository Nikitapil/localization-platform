import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { CreateUserDto } from '../user/dto/Requests/CreateUserDto';
import { AuthService } from './auth.service';
import { UserWithTokenData } from './types';
import { REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE_TIME } from './constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserResponse } from './dto/Responses/AuthUserResponse';
import { LoginDto } from './dto/Requests/LoginDto';
import { Cookies } from '../../decorators/Cookies.decorator';
import { AuthRequired } from './decorators/AuthRequired.decorator';
import { SuccessMessageDto } from '../../dto/SuccessMessageDto';

@ApiTags('Auth')
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
  register(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<AuthUserResponse> {
    return this.useAuthMethod(res, () => this.authService.register(dto));
  }

  @ApiOperation({ summary: 'Login', operationId: 'login' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
    type: AuthUserResponse
  })
  @Post('login')
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<AuthUserResponse> {
    return this.useAuthMethod(res, () => this.authService.login(dto));
  }

  @ApiOperation({ summary: 'Refresh auth tokens', operationId: 'refresh' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed.',
    type: AuthUserResponse
  })
  @Get('refresh')
  refresh(
    @Cookies(REFRESH_TOKEN_COOKIE_NAME) refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthUserResponse> {
    return this.useAuthMethod(res, () => this.authService.refresh(refreshToken));
  }

  @ApiOperation({ summary: 'log out', operationId: 'logout' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged out.',
    type: SuccessMessageDto
  })
  @AuthRequired()
  @Delete('logout')
  logout(
    @Cookies(REFRESH_TOKEN_COOKIE_NAME) refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<SuccessMessageDto> {
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
    return this.authService.logout(refreshToken);
  }
}
