import { UserToken } from '../auth/types';
import { ExportTranslationsToJsonDto } from './dto/Requests/ExportTranslationsToJsonDto';

export interface ExportTranslationToJsonParams {
  dto: ExportTranslationsToJsonDto;
  user: UserToken;
}
