import { PaginationDto } from '../../../../dto/PaginationDto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetTextsDto extends PaginationDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  searchString?: string;
}
