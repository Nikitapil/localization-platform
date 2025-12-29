import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
  @ApiProperty({ description: 'user email', type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'user name', type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'user last name', type: String })
  @IsString()
  @IsNotEmpty()
  lastname: string;
}
