import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TranslationService } from './translation.service';
import { CreateTranslationDto } from './dto/Requests/CreateTranslationDto';
import { User } from '../auth/decorators/User.decorator';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import type { UserToken } from '../auth/types';
import { TextTranslationDto } from './dto/Responses/TextTranslationDto';

@ApiTags('translation')
@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @ApiOperation({ summary: 'Create translation', operationId: 'createTranslation' })
  @ApiResponse({
    status: 200,
    description: 'Translation created successfully..',
    type: TextTranslationDto
  })
  @AuthRequired()
  @Post()
  createTranslation(@Body() dto: CreateTranslationDto, @User() user: UserToken): Promise<TextTranslationDto> {
    return this.translationService.createTranslation({ dto, user });
  }

  @ApiOperation({ summary: 'Edit translation', operationId: 'editTranslation' })
  @ApiResponse({
    status: 200,
    description: 'Translation edit successfully..',
    type: TextTranslationDto
  })
  @AuthRequired()
  @Put()
  editTranslation(@Body() dto: TextTranslationDto): Promise<TextTranslationDto> {
    return this.translationService.editTranslation(dto);
  }
}
