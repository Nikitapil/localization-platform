import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './UserResponseDto';

export class ResponseWithUserDto {
  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}
