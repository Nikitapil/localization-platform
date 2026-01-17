import type { ProfileUserResponseDto } from '@/api/swagger/data-contracts';

export interface ProfileUserWithId extends ProfileUserResponseDto {
  id: string;
}
