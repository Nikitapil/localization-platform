import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserToken } from '../auth/types';
import { UserFromDb } from 'src/modules/user/types';
import { ProfileResponseDto } from './dto/Responses/ProfileResponseDto';

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

  async getMyProfile(user: UserToken) {
    const profileFromDb = await this.prismaService.profile.findUnique({
      where: { id: user.profileId }
    });

    if (!profileFromDb) {
      throw new NotFoundException({ message: 'Profile not found.' });
    }

    const userFromDb = await this.prismaService.user.findUnique({
      where: { id: user.id }
    });

    if (!userFromDb) {
      throw new NotFoundException({ message: 'User not found.' });
    }

    return new ProfileResponseDto({ profileFromDb, user: userFromDb });
  }
}
