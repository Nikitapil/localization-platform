import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Header,
  ParseFilePipe,
  Post,
  Query,
  StreamableFile,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { TranslationFilesService } from './translation-files.service';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import { ExportTranslationsToJsonDto } from './dto/Requests/ExportTranslationsToJsonDto';
import { User } from '../auth/decorators/User.decorator';
import { type UserToken } from '../auth/types';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessMessageDto } from 'src/dto/SuccessMessageDto';
import { UploadTranslationsByJsonBody } from './dto/Requests/UploadTranslationsByJsonBody';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadTranslationsByJsonDto } from './dto/Requests/UploadTranslationsByJsonDto';
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

  @AuthRequired()
  @ApiOperation({ summary: 'Upload translations by json', operationId: 'uploadTranslationsByJson' })
  @ApiResponse({ status: 200, type: SuccessMessageDto })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload translations by json body',
    type: UploadTranslationsByJsonBody
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-translations')
  // TODO file format validation
  async uploadTranslationsByJson(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'application/json', skipMagicNumbersValidation: true })]
      })
    )
    file: Express.Multer.File,
    @Body() dto: UploadTranslationsByJsonDto,
    @User() user: UserToken
  ) {
    return this.translationsFilesService.uploadTranslationsByFile({ file, dto, user });
  }
}
