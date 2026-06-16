import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserToken } from '../auth/types';
import { LangsStatisticResponseDto } from './dto/Responses/LangsStatisticResponseDto';

@Injectable()
export class StatisticsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfileStatistics(user: UserToken) {
    const [totalLangs, totalTexts, totalProfileUsers] = await Promise.all([
      this.prismaService.lang.count({
        where: { profileId: user.profileId }
      }),
      this.prismaService.text.count({
        where: { profileId: user.profileId }
      }),
      this.prismaService.user.count({
        where: { profileId: user.profileId }
      })
    ]);

    return { totalLangs, totalTexts, totalProfileUsers };
  }

  async getLangsStatistics(user: UserToken) {
    const langs = await this.prismaService.lang.findMany({
      where: { profileId: user.profileId },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            translations: true
          }
        }
      }
    });

    const totalTextsCount = await this.prismaService.text.count({ where: { profileId: user.profileId } });

    return langs.map((lang) => new LangsStatisticResponseDto({ lang, totalTextsCount }));
  }
}
