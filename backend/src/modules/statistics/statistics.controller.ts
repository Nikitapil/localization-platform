import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { AuthRequired } from '../auth/decorators/AuthRequired.decorator';
import { User } from '../auth/decorators/User.decorator';
import type { UserToken } from '../auth/types';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfileStatisticsResponseDto } from './dto/Responses/ProfileStatisticResponseDto';
import { LangsStatisticResponseDto } from './dto/Responses/LangsStatisticResponseDto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @ApiOperation({ summary: 'Get profile statistics', operationId: 'getProfileStatistics' })
  @ApiResponse({
    status: 200,
    description: 'Profile statistics..',
    type: ProfileStatisticsResponseDto
  })
  @AuthRequired()
  @Get('profile')
  getProfileStatistics(@User() user: UserToken): Promise<ProfileStatisticsResponseDto> {
    return this.statisticsService.getProfileStatistics(user);
  }

  @ApiOperation({ summary: 'Get langs statistics', operationId: 'getLangsStatistics' })
  @ApiResponse({
    status: 200,
    description: 'Langs statistics..',
    type: [LangsStatisticResponseDto]
  })
  @AuthRequired()
  @Get('langs')
  getLangsStatistics(@User() user: UserToken): Promise<LangsStatisticResponseDto[]> {
    return this.statisticsService.getLangsStatistics(user);
  }
}
