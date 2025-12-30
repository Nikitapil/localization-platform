import { IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsMatch } from '../../../../shared/validation/Match.validator';

export class ChangePasswordDto {
  @ApiProperty({ description: 'user old password', type: String })
  oldPassword: string;

  @ApiProperty({ description: 'user new password', type: String })
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
  newPassword: string;

  @ApiProperty({ description: 'repeated password', type: String })
  @IsMatch('newPassword', { message: 'Passwords should be equal' })
  repeatedPassword: string;
}
