import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiKey as ApiKeyType } from 'generated/prisma';

export const ApiKey = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.apiKey as ApiKeyType;
});
