import { ApiProperty } from '@nestjs/swagger';

interface LangWithTranslationsCount {
  name: string;
  id: string;
  _count: {
    translations: number;
  };
}

interface LangsStatisticResponseDtoParams {
  lang: LangWithTranslationsCount;
  totalTextsCount: number;
}

export class LangsStatisticResponseDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  langName: string;
  @ApiProperty({ type: Number })
  totalTranslationsCount: number;
  @ApiProperty({ type: Number })
  translationProgress: number;

  constructor({ lang, totalTextsCount }: LangsStatisticResponseDtoParams) {
    this.id = lang.id;
    this.totalTranslationsCount = lang._count.translations;
    this.langName = lang.name;
    this.translationProgress = (this.totalTranslationsCount / totalTextsCount) * 100;
  }
}
