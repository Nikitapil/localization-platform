import { AddLangDto } from './dto/Requests/AddLangDto';
import { UserToken } from '../auth/types';
import { EditLangDto } from './dto/Requests/EditLangDto';
import { GetLangsDto } from './dto/Requests/GetLangsDto';

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

export interface GetLangsParams {
  dto: GetLangsDto;
  user: UserToken;
}
