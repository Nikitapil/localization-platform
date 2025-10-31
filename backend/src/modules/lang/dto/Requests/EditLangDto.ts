import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditLangDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;
}
