import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import { ResponseWithUserDto } from './dto/Responses/ResponseWithUserDto';
import { EditUserDto } from './dto/Requests/EditUserDto';
import { User } from '../auth/decorators/User.decorator';
import type { UserToken } from '../auth/types';
import { SuccessMessageDto } from 'src/dto/SuccessMessageDto';
import { ChangePasswordDto } from './dto/Requests/ChangePasswordDto';
import { ProfileUsersListResponseDto } from './dto/Responses/ProfileUsersListResponseDto';
import { GetProfileUsersDto } from './dto/Requests/GetProfileUsersDto';
import { ProfileUserResponseDto } from './dto/Responses/ProfileUserResponseDto';
import { EditProfileUserDto } from './dto/Requests/EditProfileUserDto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Edit user', operationId: 'editUser' })
  @ApiResponse({
    status: 200,
    description: 'User edited successfully..',
    type: ResponseWithUserDto
  })
  @AuthRequired()
  @Put()
  editUser(@Body() dto: EditUserDto, @User() user: UserToken): Promise<ResponseWithUserDto> {
    return this.userService.editUser({ dto, user });
  }

  @ApiOperation({ summary: 'Change password', operationId: 'changePassword' })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully..',
    type: SuccessMessageDto
  })
  @AuthRequired()
  @Put('/password')
  changePassword(@Body() dto: ChangePasswordDto, @User() user: UserToken): Promise<SuccessMessageDto> {
    return this.userService.changePassword({ dto, user });
  }

  @ApiOperation({ summary: 'Get profile users', operationId: 'getProfileUsers' })
  @ApiResponse({
    status: 200,
    description: 'UsersList return..',
    type: ProfileUsersListResponseDto
  })
  @AuthRequired()
  @Get('/profile-users')
  getProfileUsers(@Query() dto: GetProfileUsersDto, @User() user: UserToken): Promise<ProfileUsersListResponseDto> {
    return this.userService.getProfileUsers({ dto, user });
  }

  @ApiOperation({ summary: 'Edit profile user information', operationId: 'editProfileUser' })
  @ApiResponse({
    status: 200,
    description: 'User editted successfully',
    type: ProfileUserResponseDto
  })
  @AuthRequired()
  @Put('/edit-profile-user')
  editProfileUser(@Body() dto: EditProfileUserDto, @User() user: UserToken): Promise<ProfileUserResponseDto> {
    return this.userService.editProfileUser({ dto, user });
  }
}
