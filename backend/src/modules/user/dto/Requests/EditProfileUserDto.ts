import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'generated/prisma';
import { AtleastOneProvided } from '../../../../shared/validation/AtleastOneProvided';

export class EditProfileUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isConfirmed?: boolean;

  @ApiProperty({ type: String, enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @AtleastOneProvided(['isConfirmed', 'role'])
  editData: unknown;
}
