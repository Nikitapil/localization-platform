import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserToken } from '../auth/types';

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
}
