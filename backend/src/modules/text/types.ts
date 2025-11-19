import { UserToken } from '../auth/types';
import { CreateTextDto } from './dto/Requests/CreateTextDto';
import { EditTextDto } from './dto/Requests/EditTextDto';

export interface CreateTextParams {
  dto: CreateTextDto;
  user: UserToken;
}

export interface GetTextParams {
  key: string;
  user: UserToken;
}

export interface DeleteTextParams {
  key: string;
  user: UserToken;
}

export interface EditTextParams {
  dto: EditTextDto;
  user: UserToken;
}

export interface TextLangFromDb {
  id: string;
  name: string;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TextTranslationFromDb {
  id: string;
  lang: TextLangFromDb;
  langId: string;
  textKey: string;
  value: string;
}

export interface TextFromDb {
  id: string;
  key: string;
  translations: TextTranslationFromDb[];
  userId: string;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
}
