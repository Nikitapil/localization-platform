import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTranslationParams } from './types';
import { PrismaService } from '../../prisma/prisma.service';
import { TextTranslationDto } from './dto/Responses/TextTranslationDto';

@Injectable()
export class TranslationService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTranslation({ dto, user }: CreateTranslationParams) {
    const text = await this.prismaService.text.findUnique({
      where: {
        key_profileId: {
          key: dto.textKey,
          profileId: user.profileId
        }
      }
    });

    if (!text) {
      throw new NotFoundException();
    }

    const lang = await this.prismaService.lang.findUnique({
      where: {
        id: dto.langId
      }
    });

    if (!lang) {
      throw new NotFoundException();
    }

    const newTranslation = await this.prismaService.translation.create({
      data: {
        langId: dto.langId,
        textKey: dto.textKey,
        value: dto.value
      },
      include: {
        lang: true
      }
    });

    return new TextTranslationDto(newTranslation);
  }
}
