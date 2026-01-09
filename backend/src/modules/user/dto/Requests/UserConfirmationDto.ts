import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UserConfirmationDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isConfirmed: boolean;
}
