import { UserToken } from '../auth/types';
import { EditUserDto } from './dto/Requests/EditUserDto';

export type UserFromDb = {
  id: string;
  email: string;
  name: string;
  lastname: string;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface EditUserParams {
  dto: EditUserDto;
  user: UserToken;
}
