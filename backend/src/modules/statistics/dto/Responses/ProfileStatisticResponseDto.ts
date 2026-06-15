import { ApiProperty } from '@nestjs/swagger';

export class ProfileStatisticsResponseDto {
  @ApiProperty({ type: Number })
  totalLangs: number;

  @ApiProperty({ type: Number })
  totalTexts: number;

  @ApiProperty({ type: Number })
  totalProfileUsers: number;
}
