import { UserResponseDto } from '../user/dto/Responses/UserResponseDto';

export interface UserToken {
  id: string;
  profileId: string;
}

export interface UserWithTokenData {
  accessToken: string;
  refreshToken: string;
  user: UserResponseDto;
}