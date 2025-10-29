import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/Requests/CreateUserDto';
import { Prisma } from 'generated/prisma';
import bcrypt from 'bcryptjs';
import { ProfileService } from '../profile/profile.service';
import { getSafeUserOmit } from '../../shared/db-helpers/safeUserOmit';
import { UserResponseDto } from './dto/Responses/UserResponseDto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly profileService: ProfileService
  ) {}

  private async throwIfUserAlreadyExist(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email }
    });

    if (user) {
      throw new ConflictException({ email: 'User with this email already exists' });
    }
  }

  async createUser(dto: CreateUserDto) {
    const { email, password, name, lastname, profileId, createProfileFields } = dto;
    await this.throwIfUserAlreadyExist(dto.email);

    const hashedPassword = await bcrypt.hash(password, 10);

    let profileData:
      | Pick<Required<Prisma.UserCreateArgs['data']>, 'profileId'>
      | Pick<Required<Prisma.UserCreateArgs['data']>, 'profile'>
      | null = null;

    if (profileId) {
      await this.profileService.throwIfProfileNotExist(profileId);
      profileData = { profileId };
    }

    if (createProfileFields) {
      await this.profileService.throwIfProfileAlreadyExist(createProfileFields.name);
      profileData = {
        profile: {
          create: {
            name: createProfileFields.name
          }
        }
      };
    }

    if (!profileData) {
      throw new BadRequestException('No profile data provided');
    }

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        lastname,
        ...profileData
      },
      omit: getSafeUserOmit()
    });

    return { user: new UserResponseDto({ user }) };
  }

  async getUserDtoByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      omit: getSafeUserOmit()
    });

    if (!user) {
      throw new NotFoundException({ message: 'User not found' });
    }

    return new UserResponseDto({ user });
  }
}
