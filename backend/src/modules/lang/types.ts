import { AddLangDto } from './dto/Requests/AddLangDto';
import { UserToken } from '../auth/types';
import { EditLangDto } from './dto/Requests/EditLangDto';

export interface AddLangParams {
  dto: AddLangDto;
  user: UserToken;
}

export interface EditLangParams {
  dto: EditLangDto;
  user: UserToken;
}

export interface DeleteLangParams {
  id: string;
  user: UserToken;
}
