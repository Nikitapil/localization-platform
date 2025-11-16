import { ApiProperty } from '@nestjs/swagger';
import { LangResponseDto } from './LangResponseDto';

export class LangsResponseDto {
  @ApiProperty({ type: [LangResponseDto] })
  langs: LangResponseDto[];

  @ApiProperty({ type: Number })
  totalCount: number;
}
