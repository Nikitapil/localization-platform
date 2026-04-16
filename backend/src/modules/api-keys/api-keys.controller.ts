import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiKeysService } from './api-keys.service';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import { ApiKeyResponseDto } from './dto/Responses/ApiKeyResponseDto';
import { User } from '../auth/decorators/User.decorator';
import type { UserToken } from '../auth/types';

@ApiTags('ApiKeys')
@Controller('api-keys')
export class ApiKeysController {
  constructor(private readonly service: ApiKeysService) {}

  @ApiOperation({ summary: 'Create api ket', operationId: 'createApiKey' })
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
}
