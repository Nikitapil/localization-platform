import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LangService } from './lang.service';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import { AddLangDto } from './dto/Requests/AddLangDto';
import type { UserToken } from '../auth/types';
import { User } from '../auth/decorators/User.decorator';
import { LangResponseDto } from './dto/Responses/LangResponseDto';
import { EditLangDto } from './dto/Requests/EditLangDto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuccessMessageDto } from '../../dto/SuccessMessageDto';

@Controller('lang')
export class LangController {
  constructor(private readonly langService: LangService) {}

  @ApiOperation({ summary: 'Add Lang', operationId: 'addLang' })
  @ApiResponse({
    status: 201,
    description: 'Lang added.',
    type: LangResponseDto
  })
  @AuthRequired()
  @Post()
  addLang(@Body() dto: AddLangDto, @User() user: UserToken): Promise<LangResponseDto> {
    return this.langService.addLang({ dto, user });
  }

  @ApiOperation({ summary: 'Edit Lang', operationId: 'editLang' })
  @ApiResponse({
    status: 200,
    description: 'Lang edited.',
    type: LangResponseDto
  })
  @AuthRequired()
  @Put()
  editLang(@Body() dto: EditLangDto, @User() user: UserToken): Promise<LangResponseDto> {
    return this.langService.editLang({ dto, user });
  }

  @AuthRequired()
  @Delete(':id')
  deleteLang(@Param('id') id: string, @User() user: UserToken): Promise<SuccessMessageDto> {
    return this.langService.deleteLang({ id, user });
  }

  @AuthRequired()
  @Get()
  getLangs() {}
}
