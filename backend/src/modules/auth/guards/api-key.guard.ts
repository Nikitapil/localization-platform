import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const apiKeyFromDb = await this.prismaService.apiKey.findUnique({ where: { key: apiKey } });

    if (!apiKeyFromDb) {
      throw new UnauthorizedException('Wrong api key');
    }

    request.apiKey = apiKeyFromDb;

    return true;
  }
}
