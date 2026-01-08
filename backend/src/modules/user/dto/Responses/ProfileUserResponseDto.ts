import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './UserResponseDto';
import { UserFromDb } from '../../types';
import { UserRole } from 'generated/prisma';

interface ProfileUserResponseDtoParams {
  user: UserFromDb;
  currentUser: UserFromDb;
}

export class ProfileUserResponseDto {
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @ApiProperty({ type: Boolean })
  canEditUser: boolean;

  constructor({ user, currentUser }: ProfileUserResponseDtoParams) {
    this.user = new UserResponseDto({ user });
    this.canEditUser = currentUser.role === UserRole.MAIN && currentUser.profileId === user.profileId;
  }
}
