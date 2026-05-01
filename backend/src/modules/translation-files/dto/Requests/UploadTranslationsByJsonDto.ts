import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadTranslationsByJsonDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  langId: string;
}
