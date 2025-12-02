import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { CreateUserDto } from '../user/dto/Requests/CreateUserDto';
import { AuthService } from './auth.service';
import { UserWithTokenData } from './types';
import { REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_MAX_AGE_TIME } from './constants';
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { AuthUserResponse } from './dto/Responses/AuthUserResponse';
import { LoginDto } from './dto/Requests/LoginDto';
import { Cookies } from '../../decorators/Cookies.decorator';
import { AuthRequired } from './decorators/AuthRequired.decorator';
import { SuccessMessageDto } from '../../dto/SuccessMessageDto';
import { MessageDto } from '../../dto/MessageDto';

@ApiTags('Auth')
@Controller('auth')
@ApiExtraModels(MessageDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private async useAuthMethod<T extends UserWithTokenData | MessageDto>(res: Response, method: () => Promise<T>) {
    const result = await method();

    if (result instanceof MessageDto) {
      return result;
    }

    const { user, accessToken, refreshToken } = result;

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
    schema: {
      oneOf: [{ $ref: getSchemaPath(AuthUserResponse) }, { $ref: getSchemaPath(MessageDto) }]
    }
  })
  @Post('register')
  register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthUserResponse | MessageDto> {
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
