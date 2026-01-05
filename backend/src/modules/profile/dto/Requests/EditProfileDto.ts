import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditProfileDto {
  @ApiProperty({ description: 'Profile name', type: String })
  @IsString()
  @IsNotEmpty()
  name: string;
}
