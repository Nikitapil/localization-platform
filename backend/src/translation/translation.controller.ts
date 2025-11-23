import { Controller, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TranslationService } from './translation.service';

@ApiTags('translation')
@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post()
  createTranslation() {}

  @Put()
  editTranslation() {}
}
