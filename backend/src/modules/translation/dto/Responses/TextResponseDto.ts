import { TextTranslationDto } from '../../../text/dto/Responses/TextTranslationDto';
import { ApiProperty } from '@nestjs/swagger';
import { TextFromDb } from '../../../text/types';

export class TextResponseDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  key: string;

  @ApiProperty({ type: [TextTranslationDto] })
  translations: TextTranslationDto[];

  @ApiProperty({ type: String })
  updatedAt: Date;

  constructor(text: TextFromDb) {
    this.id = text.id;
    this.key = text.key;
    this.translations = text.translations.map((translation) => new TextTranslationDto(translation));
    this.updatedAt = text.updatedAt;
  }
}
