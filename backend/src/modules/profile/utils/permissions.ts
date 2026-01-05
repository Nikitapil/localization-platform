import { UserFromDb } from 'src/modules/user/types';
import { ProfileFromDb } from '../types';
import { UserRole } from 'generated/prisma';

export const getCanEditProfile = ({ user, profile }: { user: UserFromDb; profile: ProfileFromDb }) => {
  return user.profileId === profile.id && user.role === UserRole.MAIN;
};
