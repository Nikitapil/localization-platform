import { ApiProperty } from '@nestjs/swagger';
import { UserFromDb } from '../../../../shared/types/db';

interface IUserResponseDtoParams {
  user: UserFromDb;
}

export class UserResponseDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  lastname: string;

  @ApiProperty({ type: String })
  profileId: string;

  @ApiProperty({ type: String })
  createdAt: Date;

  @ApiProperty({ type: String })
  updatedAt: Date;

  constructor({ user }: IUserResponseDtoParams) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.lastname = user.lastname;
    this.profileId = user.profileId;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
