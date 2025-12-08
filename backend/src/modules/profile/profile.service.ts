import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async throwIfProfileAlreadyExist(profileName: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: { name: profileName }
    });

    if (profile) {
      throw new ConflictException({ profileName: 'Profile with this name already exists' });
    }
  }

  async throwIfProfileNotExist(profileId: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: { id: profileId }
    });

    if (!profile) {
      throw new NotFoundException({ profileId: 'Profile not found' });
    }
  }

  async checkIfProfileExist(profileName: string) {
    const profile = await this.prismaService.profile.findUnique({
      where: { name: profileName }
    });

    return !!profile;
  }
}
