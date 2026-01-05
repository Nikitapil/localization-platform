import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { ProfileResponseDto } from './dto/Responses/ProfileResponseDto';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import { User } from '../auth/decorators/User.decorator';
import type { UserToken } from '../auth/types';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ summary: 'Get is profile exist', operationId: 'getIsProfileExist' })
  @ApiResponse({
    status: 200,
    description: 'Profile exist or not',
    type: Boolean
  })
  @Get('/check/:name')
  check(@Param('name') name: string): Promise<boolean> {
    return this.profileService.checkIfProfileExist(name);
  }

  @ApiOperation({ summary: 'Get my profile', operationId: 'getMyProfile' })
  @ApiResponse({
    status: 200,
    description: 'Profile of user',
    type: ProfileResponseDto
  })
  @AuthRequired()
  @Get()
  getMyProfile(@User() user: UserToken): Promise<ProfileResponseDto> {
    return this.profileService.getMyProfile(user);
  }
}
