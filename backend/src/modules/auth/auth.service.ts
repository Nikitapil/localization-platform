import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/Requests/CreateUserDto';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../user/dto/Responses/UserResponseDto';
import { UserToken } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async createUserWithTokenData({ user }: { user: UserResponseDto }) {
    const accessToken = this.jwtService.sign<UserToken>(
      { id: user.id, profileId: user.profileId },
      {
        expiresIn: process.env.JWT_ACCESS_LIFE_TIME as `${number}`,
        secret: process.env.JWT_ACCESS_SECRET
      }
    );

    const refreshToken = this.jwtService.sign<UserToken>(
      { id: user.id, profileId: user.profileId },
      {
        expiresIn: process.env.JWT_REFRESH_LIFE_TIME as `${number}`,
        secret: process.env.JWT_REFRESH_SECRET
      }
    );

    await this.prismaService.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken
      }
    });

    return { accessToken, refreshToken, user };
  }

  async register(dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);

    return this.createUserWithTokenData(user);
  }
}
