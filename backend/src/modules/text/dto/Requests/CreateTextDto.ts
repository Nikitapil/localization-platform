import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTextDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  key: string;
}
