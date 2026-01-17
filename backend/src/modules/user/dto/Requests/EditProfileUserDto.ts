import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'generated/prisma';
import { AtleastOneProvided } from '../../../../shared/validation/AtleastOneProvided';

export class EditProfileUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isConfirmed?: boolean;

  @ApiPropertyOptional({ type: String, enum: UserRole, enumName: 'UserRole' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @AtleastOneProvided(['isConfirmed', 'role'])
  editData: unknown;
}
