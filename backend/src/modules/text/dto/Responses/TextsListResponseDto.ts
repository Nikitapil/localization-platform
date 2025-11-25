import { TextResponseDto } from '../../../translation/dto/Responses/TextResponseDto';
import { TextFromDb } from '../../types';
import { ApiProperty } from '@nestjs/swagger';

interface TextsListResponseDtoParams {
  textsFromDb: TextFromDb[];
  totalCount: number;
}

export class TextsListResponseDto {
  @ApiProperty({ type: [TextResponseDto] })
  texts: TextResponseDto[];

  @ApiProperty({ type: Number })
  totalCount: number;

  constructor({ textsFromDb, totalCount }: TextsListResponseDtoParams) {
    this.texts = textsFromDb.map((text) => new TextResponseDto(text));
    this.totalCount = totalCount;
  }
}
