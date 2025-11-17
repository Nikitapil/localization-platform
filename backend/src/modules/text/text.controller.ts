import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
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
    status: 200,
    description: 'Text created..',
    type: TextResponseDto
  })
  @AuthRequired()
  @Post()
  createText(@Body() dto: CreateTextDto, @User() user: UserToken): Promise<TextResponseDto> {
    return this.textService.createText({ dto, user });
  }

  @Get()
  getText() {}

  @Delete()
  deleteText() {}

  @Put()
  editText() {}

  @Get()
  getTexts() {}
}
