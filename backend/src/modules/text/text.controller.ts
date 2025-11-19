import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TextService } from './text.service';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import { CreateTextDto } from './dto/Requests/CreateTextDto';
import { User } from '../auth/decorators/User.decorator';
import type { UserToken } from '../auth/types';
import { TextResponseDto } from './dto/Responses/TextResponseDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('text')
@Controller('text')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @ApiOperation({ summary: 'Create Text', operationId: 'createText' })
  @ApiResponse({
    status: 201,
    description: 'Text created..',
    type: TextResponseDto
  })
  @AuthRequired()
  @Post()
  createText(@Body() dto: CreateTextDto, @User() user: UserToken): Promise<TextResponseDto> {
    return this.textService.createText({ dto, user });
  }

  @ApiOperation({ summary: 'Get Text by key', operationId: 'getTextByKey' })
  @ApiResponse({
    status: 200,
    description: 'Text received..',
    type: TextResponseDto
  })
  @AuthRequired()
  @Get(':key')
  getTextByKey(@Param('key') key: string, @User() user: UserToken): Promise<TextResponseDto> {
    return this.textService.getTextByKey({ key, user });
  }

  @Delete(':key')
  deleteText() {}

  @Put()
  editText() {}

  @Get()
  getTexts() {}
}
