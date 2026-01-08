import { ApiProperty } from '@nestjs/swagger';
import { ProfileUserResponseDto } from './ProfileUserResponseDto';
import { UserFromDb } from '../../types';

interface ProfileUsersListResponseDtoParams {
  users: UserFromDb[];
  currentUser: UserFromDb;
  totalCount: number;
}

export class ProfileUsersListResponseDto {
  @ApiProperty({ type: [ProfileUserResponseDto] })
  users: ProfileUserResponseDto[];

  @ApiProperty({ type: Number })
  totalCount: number;

  constructor({ users, currentUser, totalCount }: ProfileUsersListResponseDtoParams) {
    this.users = users.map((user) => new ProfileUserResponseDto({ user, currentUser }));
    this.totalCount = totalCount;
  }
}
