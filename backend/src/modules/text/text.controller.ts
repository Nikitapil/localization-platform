import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TextService } from './text.service';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import { CreateTextDto } from './dto/Requests/CreateTextDto';
import { User } from '../auth/decorators/User.decorator';
import type { UserToken } from '../auth/types';
import { TextResponseDto } from '../translation/dto/Responses/TextResponseDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessMessageDto } from '../../dto/SuccessMessageDto';
import { EditTextDto } from './dto/Requests/EditTextDto';
import { GetTextsDto } from './dto/Requests/GetTextsDto';
import { TextsListResponseDto } from './dto/Responses/TextsListResponseDto';

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

  @ApiOperation({ summary: 'Delete text', operationId: 'deleteText' })
  @ApiResponse({
    status: 200,
    description: 'Text deleted..',
    type: SuccessMessageDto
  })
  @AuthRequired()
  @Delete(':key')
  deleteText(@Param('key') key: string, @User() user: UserToken): Promise<SuccessMessageDto> {
    return this.textService.deleteText({ key, user });
  }

  @ApiOperation({ summary: 'Edit text', operationId: 'editText' })
  @ApiResponse({
    status: 200,
    description: 'Text edited..',
    type: TextResponseDto
  })
  @AuthRequired()
  @Put()
  editText(@Body() dto: EditTextDto, @User() user: UserToken): Promise<TextResponseDto> {
    return this.textService.editText({ dto, user });
  }

  @ApiOperation({ summary: 'Edit text', operationId: 'getTexts' })
  @ApiResponse({
    status: 200,
    description: 'Text list returned..',
    type: TextsListResponseDto
  })
  @AuthRequired()
  @Get()
  getTexts(@Query() dto: GetTextsDto, @User() user: UserToken): Promise<TextsListResponseDto> {
    return this.textService.getTexts({ dto, user });
  }
}
