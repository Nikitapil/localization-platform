import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserToken } from '../types';

export const User = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as UserToken;
});
