import { Controller, Get, Header, Query, StreamableFile } from '@nestjs/common';
import { TranslationFilesService } from './translation-files.service';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import { ExportTranslationsToJsonDto } from './dto/Requests/ExportTranslationsToJsonDto';
import { User } from '../auth/decorators/User.decorator';
import { type UserToken } from '../auth/types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
@Controller('translation-files')
export class TranslationFilesController {
  constructor(private readonly translationsFilesService: TranslationFilesService) {}

  @ApiOperation({
    summary: 'Export language translations to JSON file',
    description: 'Returns a JSON file containing translations based on provided filters',
    operationId: 'downloadLangTranslations'
  })
  @ApiResponse({
    status: 200,
    description: 'JSON file with translations. The file is automatically downloaded.',
    headers: {
      'Content-Type': {
        description: 'MIME type of the response',
        schema: { type: 'string', example: 'application/json' }
      },
      'Content-Disposition': {
        description: 'Attachment header with filename',
        schema: { type: 'string', example: 'attachment; filename="translations_2024-01-01.json"' }
      }
    },
    content: {
      'application/json': {
        schema: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @AuthRequired()
  @Get('export-lang-translation')
  @Header('Content-Type', 'application/json')
  async downloadLangTranslations(
    @Query() dto: ExportTranslationsToJsonDto,
    @User() user: UserToken
  ): Promise<StreamableFile> {
    return this.translationsFilesService.exportLangTranslationsToJson({ dto, user });
  }
}
