import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_AUTH_REQUIRED_KEY } from '../decorators/AuthRequired.decorator';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest<UserToken>(err, user: UserToken, info, context: ExecutionContext): UserToken {
    if (user) {
      return user;
    }
    const isRequired = this.reflector.getAllAndOverride<boolean, string>(`${IS_AUTH_REQUIRED_KEY}`, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isRequired) {
      throw new UnauthorizedException();
    }

    return user;
  }
}