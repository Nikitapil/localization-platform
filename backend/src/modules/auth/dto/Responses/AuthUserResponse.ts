import { UserResponseDto } from '../../../user/dto/Responses/UserResponseDto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserResponse {
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @ApiProperty({ type: String })
  accessToken: string;
}
