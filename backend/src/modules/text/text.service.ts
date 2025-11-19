import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTextParams, GetTextParams } from './types';
import { TextResponseDto } from './dto/Responses/TextResponseDto';
import { getTextInclude } from './helpers/db-helpers';

@Injectable()
export class TextService {
  constructor(private readonly prismaService: PrismaService) {}

  async throwIfTextExist({ key, profileId }: { key: string; profileId: string }) {
    const text = await this.prismaService.text.findUnique({
      where: {
        key_profileId: {
          key,
          profileId
        }
      }
    });

    if (text) {
      throw new ConflictException({ existingKey: 'This text already exist' });
    }
  }

  async createText({ dto, user }: CreateTextParams): Promise<TextResponseDto> {
    await this.throwIfTextExist({ key: dto.key, profileId: user.profileId });

    const text = await this.prismaService.text.create({
      data: {
        key: dto.key,
        userId: user.id,
        profileId: user.profileId
      },
      include: getTextInclude()
    });

    return new TextResponseDto(text);
  }

  async getTextByKey({ key, user }: GetTextParams): Promise<TextResponseDto> {
    const text = await this.prismaService.text.findUnique({
      where: {
        key_profileId: {
          key,
          profileId: user.profileId
        }
      },
      include: getTextInclude()
    });

    if (!text) {
      throw new NotFoundException({ message: 'Text not found' });
    }

    return new TextResponseDto(text);
  }

  async deleteText() {}
}
