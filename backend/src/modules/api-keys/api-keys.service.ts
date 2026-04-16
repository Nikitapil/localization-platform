import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiKeyResponseDto } from './dto/Responses/ApiKeyResponseDto';
import { DeleteApiKeyParams } from './types';
import { SuccessMessageDto } from 'src/dto/SuccessMessageDto';

@Injectable()
export class ApiKeysService {
  constructor(private readonly prismaService: PrismaService) {}

  async createApiKey(profileId: string) {
    const newKey = await this.prismaService.apiKey.create({
      data: { profileId }
    });

    return new ApiKeyResponseDto(newKey);
  }

  async getApiKeys(profileId: string) {
    const keys = await this.prismaService.apiKey.findMany({
      where: { profileId }
    });

    return keys.map((key) => new ApiKeyResponseDto(key));
  }

  async deleteApiKey({ key, profileId }: DeleteApiKeyParams) {
    const apiKey = await this.prismaService.apiKey.findUnique({ where: { key } });

    if (!apiKey) {
      throw new NotFoundException('Api key not found');
    }

    if (apiKey.profileId !== profileId) {
      throw new ForbiddenException();
    }

    await this.prismaService.apiKey.delete({ where: { key } });
    return new SuccessMessageDto();
  }
}
