import { UserRole } from 'generated/prisma';
import { UserToken } from '../auth/types';
import { ChangePasswordDto } from './dto/Requests/ChangePasswordDto';
import { EditUserDto } from './dto/Requests/EditUserDto';
import { GetProfileUsersDto } from './dto/Requests/GetProfileUsersDto';

export type UserFromDb = {
  id: string;
  email: string;
  name: string;
  lastname: string;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
};

export interface EditUserParams {
  dto: EditUserDto;
  user: UserToken;
}

export interface ChangePasswordParams {
  dto: ChangePasswordDto;
  user: UserToken;
}

export interface GetProfileUsersParams {
  dto: GetProfileUsersDto;
  user: UserToken;
}
