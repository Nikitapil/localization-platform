import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TranslationService } from './translation.service';
import { CreateTranslationDto } from './dto/Requests/CreateTranslationDto';
import { User } from '../auth/decorators/User.decorator';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import type { UserToken } from '../auth/types';

@ApiTags('translation')
@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @AuthRequired()
  @Post()
  createTranslation(@Body() dto: CreateTranslationDto, @User() user: UserToken) {
    return this.translationService.createTranslation({ dto, user });
  }

  @Put()
  editTranslation() {}
}
