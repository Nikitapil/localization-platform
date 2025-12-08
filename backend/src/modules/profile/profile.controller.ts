import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfileService } from './profile.service';

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
}
