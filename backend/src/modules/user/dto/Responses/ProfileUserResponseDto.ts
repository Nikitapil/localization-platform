import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './UserResponseDto';
import { UserFromDb } from '../../types';
import { getCanEditUser } from '../../utils/permissions';

interface ProfileUserResponseDtoParams {
  user: UserFromDb;
  currentUser: UserFromDb;
}

export class ProfileUserResponseDto {
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @ApiProperty({ type: Boolean })
  canEditUser: boolean;

  @ApiProperty({ type: Boolean })
  confirmed: boolean;

  constructor({ user, currentUser }: ProfileUserResponseDtoParams) {
    this.user = new UserResponseDto({ user });
    this.canEditUser = getCanEditUser(user, currentUser);
    this.confirmed = user.confirmed;
  }
}
