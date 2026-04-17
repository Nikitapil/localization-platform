import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiKeysService } from './api-keys.service';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import { ApiKeyResponseDto } from './dto/Responses/ApiKeyResponseDto';
import { User } from '../auth/decorators/User.decorator';
import type { UserToken } from '../auth/types';
import { SuccessMessageDto } from 'src/dto/SuccessMessageDto';

@ApiTags('ApiKeys')
@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly service: ApiKeysService) {}

  @ApiOperation({ summary: 'Create api key', operationId: 'createApiKey' })
  @ApiResponse({
    status: 201,
    description: 'Api key created..',
    type: ApiKeyResponseDto
  })
  @AuthRequired()
  @Post()
  createApiKey(@User() user: UserToken): Promise<ApiKeyResponseDto> {
    return this.service.createApiKey(user.profileId);
  }

  @ApiOperation({ summary: 'Return api keys', operationId: 'getApiKeys' })
  @ApiResponse({
    status: 200,
    description: 'Api key returned..',
    type: [ApiKeyResponseDto]
  })
  @AuthRequired()
  @Get()
  getApiKeys(@User() user: UserToken): Promise<ApiKeyResponseDto[]> {
    return this.service.getApiKeys(user.profileId);
  }

  @ApiOperation({ summary: 'Delete api key', operationId: 'deleteApiKey' })
  @ApiResponse({
    status: 200,
    description: 'Api key created..',
    type: SuccessMessageDto
  })
  @AuthRequired()
  @Delete(':key')
  deleteApiKey(@Param('key') key: string, @User() user: UserToken): Promise<SuccessMessageDto> {
    return this.service.deleteApiKey({ key, profileId: user.profileId });
  }
}
