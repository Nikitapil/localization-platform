import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBooleanString, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/dto/PaginationDto';

export class GetProfileUsersDto extends PaginationDto {
  @ApiPropertyOptional({ type: Boolean })
  @IsBooleanString()
  @IsOptional()
  waitingForConfirmed?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @IsBooleanString()
  @IsOptional()
  onlyConfirmed?: boolean;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  search?: string;
}
