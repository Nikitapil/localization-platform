import { CreateProfileFieldsDto } from '../../../profile/dto/CreateProfileFieldsDto';
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsMatch } from '../../../../shared/validation/Match.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'user email', type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'user password', type: String })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    },
    { message: 'Password should have min length of 8 symbols, 1 lowercase symbol 1 uppercase symbol and 1 number' }
  )
  password: string;

  @ApiProperty({ description: 'repeated password', type: String })
  @IsMatch('password', { message: 'Passwords should be equal' })
  repeatedPassword: string;

  @ApiProperty({ description: 'user name', type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'user last name', type: String })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ description: 'new profile fields', type: CreateProfileFieldsDto })
  @ValidateNested()
  @Type(() => CreateProfileFieldsDto)
  createProfileFields: CreateProfileFieldsDto;
}
