import { UserFromDb } from '../types';
import { UserRole } from 'generated/prisma';

export const getCanEditUser = (user: UserFromDb, currentUser: UserFromDb) =>
  currentUser.role === UserRole.MAIN && currentUser.profileId === user.profileId;
