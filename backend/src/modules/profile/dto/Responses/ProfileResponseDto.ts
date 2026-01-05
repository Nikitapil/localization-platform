import { ApiProperty } from '@nestjs/swagger';
import { ProfileFromDb } from '../../types';
import { UserFromDb } from 'src/modules/user/types';
import { getCanEditProfile } from '../../utils/permissions';

interface ProfileResponseDtoParams {
  profileFromDb: ProfileFromDb;
  user: UserFromDb;
}

export class ProfileResponseDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  createdAt: Date;

  @ApiProperty({ type: String })
  updatedAt: Date;

  @ApiProperty({ type: Boolean })
  canEdit: boolean;

  constructor({ profileFromDb, user }: ProfileResponseDtoParams) {
    this.name = profileFromDb.name;
    this.id = profileFromDb.id;
    this.createdAt = profileFromDb.createdAt;
    this.updatedAt = profileFromDb.updatedAt;
    this.canEdit = getCanEditProfile({ user, profile: profileFromDb });
  }
}
