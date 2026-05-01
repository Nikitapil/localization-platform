import { UserToken } from '../auth/types';
import { ExportTranslationsToJsonDto } from './dto/Requests/ExportTranslationsToJsonDto';
import { UploadTranslationsByJsonDto } from './dto/Requests/UploadTranslationsByJsonDto';

export interface ExportTranslationToJsonParams {
  dto: ExportTranslationsToJsonDto;
  user: UserToken;
}

export interface UploadTranslationByFileParams {
  dto: UploadTranslationsByJsonDto;
  file: Express.Multer.File;
  user: UserToken;
}
