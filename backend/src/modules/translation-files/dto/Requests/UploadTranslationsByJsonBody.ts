import { ApiProperty } from '@nestjs/swagger';
import { UploadTranslationsByJsonDto } from './UploadTranslationsByJsonDto';

export class UploadTranslationsByJsonBody extends UploadTranslationsByJsonDto {
  @ApiProperty({ type: String, format: 'binary' })
  file: string;
}
