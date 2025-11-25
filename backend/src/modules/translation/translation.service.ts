import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTranslationParams } from './types';
import { PrismaService } from '../../prisma/prisma.service';
import { TextTranslationDto } from './dto/Responses/TextTranslationDto';
import { EditTranslationDto } from './dto/Requests/EditTranslationDto';
import { SuccessMessageDto } from '../../dto/SuccessMessageDto';

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
      throw new NotFoundException({ message: 'Text not found.' });
    }

    const lang = await this.prismaService.lang.findUnique({
      where: {
        id: dto.langId
      }
    });

    if (!lang) {
      throw new NotFoundException({ message: 'Lang not found.' });
    }

    const existingTranslation = await this.prismaService.translation.findUnique({
      where: {
        textKey_langId: {
          textKey: dto.textKey,
          langId: dto.langId
        }
      }
    });

    if (existingTranslation) {
      throw new ConflictException({ message: 'Translation already exists' });
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

  async editTranslation(dto: EditTranslationDto) {
    const existingTranslation = await this.prismaService.translation.findUnique({
      where: { id: dto.id }
    });

    if (!existingTranslation) {
      throw new NotFoundException({ message: 'Translation not found.' });
    }

    const translation = await this.prismaService.translation.update({
      where: { id: dto.id },
      data: {
        value: dto.value
      },
      include: {
        lang: true
      }
    });

    return new TextTranslationDto(translation);
  }

  async deleteTranslation(id: string) {
    const translation = await this.prismaService.translation.findUnique({
      where: { id }
    });

    if (!translation) {
      throw new NotFoundException({ message: 'Translation not found.' });
    }

    await this.prismaService.translation.delete({
      where: { id }
    });

    return new SuccessMessageDto();
  }
}
