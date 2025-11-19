import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTextParams, DeleteTextParams, EditTextParams, GetTextParams } from './types';
import { TextResponseDto } from './dto/Responses/TextResponseDto';
import { getTextInclude } from './helpers/db-helpers';
import { Prisma } from '../../../generated/prisma/index';
import { SuccessMessageDto } from '../../dto/SuccessMessageDto';

@Injectable()
export class TextService {
  constructor(private readonly prismaService: PrismaService) {}

  private createGetTextByKeyWhereInput(key: string, profileId: string): Prisma.TextWhereUniqueInput {
    return {
      key_profileId: {
        key,
        profileId
      }
    };
  }

  async throwIfTextExist({ key, profileId }: { key: string; profileId: string }) {
    const text = await this.prismaService.text.findUnique({
      where: this.createGetTextByKeyWhereInput(key, profileId)
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
      where: this.createGetTextByKeyWhereInput(key, user.profileId),
      include: getTextInclude()
    });

    if (!text) {
      throw new NotFoundException({ message: 'Text not found' });
    }

    return new TextResponseDto(text);
  }

  async deleteText({ key, user }: DeleteTextParams) {
    const where = this.createGetTextByKeyWhereInput(key, user.profileId);
    const text = await this.prismaService.text.findUnique({
      where
    });

    if (!text) {
      throw new NotFoundException({ message: 'Text not found' });
    }

    await this.prismaService.text.delete({ where });

    return new SuccessMessageDto();
  }

  async editText({ dto, user }: EditTextParams) {
    const where = this.createGetTextByKeyWhereInput(dto.key, user.profileId);
    const text = await this.prismaService.text.findUnique({
      where
    });

    if (!text) {
      throw new NotFoundException({ message: 'Text not found' });
    }

    await this.throwIfTextExist({ key: dto.newKey, profileId: user.profileId });

    const updatedText = await this.prismaService.text.update({
      where,
      data: {
        key: dto.newKey
      },
      include: getTextInclude()
    });

    return new TextResponseDto(updatedText);
  }
}
