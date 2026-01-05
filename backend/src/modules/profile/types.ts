import { UserToken } from '../auth/types';
import { EditProfileDto } from './dto/Requests/EditProfileDto';

export interface ProfileFromDb {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditProfileParams {
  dto: EditProfileDto;
  user: UserToken;
}
