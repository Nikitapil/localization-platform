import { TextLangDto } from './TextLangDto';
import { ApiProperty } from '@nestjs/swagger';

import {TextTranslationFromDb} from "../../../translation/types";

export class TextTranslationDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: TextLangDto })
  lang: TextLangDto;

  @ApiProperty({ type: String })
  value: string;

  constructor(textTranslation: TextTranslationFromDb) {
    this.id = textTranslation.id;
    this.lang = new TextLangDto(textTranslation.lang);
    this.value = textTranslation.value;
  }
}
