import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AddLangParams, DeleteLangParams, EditLangParams } from './types';
import { SuccessMessageDto } from '../../dto/SuccessMessageDto';

@Injectable()
export class LangService {
  constructor(private readonly prismaService: PrismaService) {}

  private async throwIfLangAlreadyExist(name: string, profileId: string) {
    const existingLang = await this.prismaService.lang.findUnique({
      where: {
        profileId_name: {
          profileId,
          name
        }
      }
    });

    if (existingLang) {
      throw new ConflictException({ name: 'This lang already exists' });
    }
  }

  async addLang({ dto, user }: AddLangParams) {
    await this.throwIfLangAlreadyExist(dto.name, user.profileId);

    const lang = await this.prismaService.lang.create({
      data: {
        name: dto.name,
        profileId: user.profileId
      }
    });

    return lang;
  }

  async editLang({ dto, user }: EditLangParams) {
    const langExist = await this.prismaService.lang.findUnique({
      where: {
        id: dto.id,
        profileId: user.profileId
      }
    });

    if (!langExist) {
      throw new NotFoundException({ message: 'Language not found' });
    }

    await this.throwIfLangAlreadyExist(dto.name, user.profileId);

    const lang = await this.prismaService.lang.update({
      where: { id: dto.id },
      data: {
        name: dto.name
      }
    });

    return lang;
  }

  async deleteLang({ id, user }: DeleteLangParams) {
    const lang = await this.prismaService.lang.findUnique({
      where: {
        id,
        profileId: user.profileId
      }
    });

    if (!lang) {
      throw new NotFoundException({ message: 'Language not found' });
    }

    await this.prismaService.lang.delete({
      where: { id, profileId: user.profileId }
    });

    return new SuccessMessageDto();
  }
}
