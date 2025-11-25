import { CreateTranslationDto } from './dto/Requests/CreateTranslationDto';
import { UserToken } from '../auth/types';
import { TextLangFromDb } from '../text/types';

export interface CreateTranslationParams {
  dto: CreateTranslationDto;
  user: UserToken;
}

export interface TextTranslationFromDb {
  id: string;
  lang: TextLangFromDb;
  langId: string;
  textKey: string;
  value: string;
}