import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditTextDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  newKey: string;
}
