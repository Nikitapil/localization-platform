import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { transformToNumber } from '../shared/transformers/transformToNumber';

export class PaginationDto {
  @ApiProperty({ type: Number })
  @IsInt()
  @Transform(transformToNumber)
  limit: number;

  @ApiProperty({ type: Number })
  @IsInt()
  @Transform(transformToNumber)
  offset: number;
}
