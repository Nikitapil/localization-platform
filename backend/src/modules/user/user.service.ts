import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/Requests/CreateUserDto';
import { Prisma, UserRole } from 'generated/prisma';
import bcrypt from 'bcryptjs';
import { getSafeUserOmit } from '../../shared/db-helpers/safeUserOmit';
import { UserResponseDto } from './dto/Responses/UserResponseDto';
import { EditUserParams, ChangePasswordParams, GetProfileUsersParams, EditProfileUserParams } from './types';
import { SuccessMessageDto } from 'src/dto/SuccessMessageDto';
import { ProfileUsersListResponseDto } from './dto/Responses/ProfileUsersListResponseDto';
import { getCanEditUser } from './utils/permissions';
import { ProfileUserResponseDto } from './dto/Responses/ProfileUserResponseDto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private async throwIfUserAlreadyExist(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email }
    });

    if (user) {
      throw new ConflictException({ email: 'User with this email already exists' });
    }
  }

  async getHashedPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async createUser(dto: CreateUserDto) {
    const { email, password, name, lastname, createProfileFields } = dto;
    await this.throwIfUserAlreadyExist(dto.email);

    const hashedPassword = await this.getHashedPassword(password);

    const profile = await this.prismaService.profile.findUnique({
      where: {
        name: createProfileFields?.name
      }
    });

    const role = profile ? UserRole.STANDART : UserRole.MAIN;
    const confirmed = !profile;

    let profileData:
      | Pick<Required<Prisma.UserCreateArgs['data']>, 'profileId'>
      | Pick<Required<Prisma.UserCreateArgs['data']>, 'profile'>
      | null = null;

    if (profile) {
      profileData = { profileId: profile.id };
    } else {
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
        role,
        confirmed,
        ...profileData
      },
      omit: getSafeUserOmit()
    });

    return { user: new UserResponseDto({ user }), confirmed };
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

  async editUser({ dto, user }: EditUserParams) {
    const dbUser = await this.prismaService.user.findUnique({
      where: { id: user.id }
    });

    if (!dbUser) {
      throw new NotFoundException({ message: 'User not found' });
    }

    if (dto.email !== dbUser.email) {
      await this.throwIfUserAlreadyExist(dto.email);
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        email: dto.email,
        name: dto.name,
        lastname: dto.lastname
      },
      omit: getSafeUserOmit()
    });

    return { user: new UserResponseDto({ user: updatedUser }) };
  }

  async changePassword({ dto, user }: ChangePasswordParams) {
    const dbUser = await this.prismaService.user.findUnique({
      where: { id: user.id }
    });

    if (!dbUser) {
      throw new NotFoundException({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(dto.oldPassword, dbUser.password);

    if (!isPasswordValid) {
      throw new BadRequestException({ oldPassword: 'Wrong password' });
    }

    const hashedPassword = await this.getHashedPassword(dto.newPassword);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword
      }
    });

    return new SuccessMessageDto();
  }

  async getProfileUsers({ dto, user }: GetProfileUsersParams) {
    const where: Prisma.UserWhereInput = {
      profileId: user.profileId
    };

    if (dto.waitingForConfirmed) {
      where.confirmed = false;
    }

    if (dto.onlyConfirmed) {
      where.confirmed = true;
    }

    if (dto.search) {
      where.OR = [
        { email: { contains: dto.search, mode: 'insensitive' } },
        { name: { contains: dto.search, mode: 'insensitive' } },
        { lastname: { contains: dto.search, mode: 'insensitive' } }
      ];
    }

    const users = await this.prismaService.user.findMany({
      where,
      take: dto.limit,
      skip: dto.offset,
      omit: getSafeUserOmit()
    });

    const totalCount = await this.prismaService.user.count({ where });

    const currentUser = await this.prismaService.user.findUnique({ where: { id: user.id }, omit: getSafeUserOmit() });

    if (!currentUser) {
      throw new NotFoundException({ message: 'Current user not found' });
    }

    return new ProfileUsersListResponseDto({ users, currentUser, totalCount });
  }

  async editProfileUser({ dto, user }: EditProfileUserParams) {
    const userFromDb = await this.prismaService.user.findUnique({ where: { id: dto.userId } });

    const currentUser = await this.prismaService.user.findUnique({ where: { id: user.id } });

    if (!userFromDb || !currentUser) {
      throw new NotFoundException({ message: 'User not found' });
    }

    const canEdit = getCanEditUser(userFromDb, currentUser);

    if (!canEdit) {
      throw new ForbiddenException({ message: 'You are not allowed to edit this user' });
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: dto.userId },
      data: {
        confirmed: dto.isConfirmed,
        role: dto.role
      },
      omit: getSafeUserOmit()
    });

    return new ProfileUserResponseDto({ user: updatedUser, currentUser });
  }
}
