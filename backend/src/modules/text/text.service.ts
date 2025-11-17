import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTextParams } from './types';
import { TextResponseDto } from './dto/Responses/TextResponseDto';

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
      include: {
        translations: {
          include: {
            lang: true
          }
        }
      }
    });

    return new TextResponseDto(text);
  }
}
