import { Body, Controller, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import { ResponseWithUserDto } from './dto/Responses/ResponseWithUserDto';
import { EditUserDto } from './dto/Requests/EditUserDto';
import { User } from '../auth/decorators/User.decorator';
import type { UserToken } from '../auth/types';
import { SuccessMessageDto } from 'src/dto/SuccessMessageDto';
import { ChangePasswordDto } from './dto/Requests/ChangePasswordDto';

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
  @Put()
  changePassword(@Body() dto: ChangePasswordDto, @User() user: UserToken): Promise<SuccessMessageDto> {
    return this.userService.changePassword({ dto, user });
  }
}
