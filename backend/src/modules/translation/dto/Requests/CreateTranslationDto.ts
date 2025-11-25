import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTranslationDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  langId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  textKey: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  value: string;
}
