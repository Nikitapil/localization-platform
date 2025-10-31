import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddLangDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;
}
