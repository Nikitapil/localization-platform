import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiKeyResponseDto } from './dto/Responses/ApiKeyResponseDto';

@Injectable()
export class ApiKeysService {
  constructor(private readonly prismaService: PrismaService) {}

  async createApiKey(profileId: string) {
    const newKey = await this.prismaService.apiKey.create({
      data: { profileId }
    });

    return new ApiKeyResponseDto(newKey);
  }
}
