import { ApiProperty } from '@nestjs/swagger';

export class ApiKeyResponseDto {
  @ApiProperty({ type: String })
  key: string;

  constructor(apiKey: { key: string }) {
    this.key = apiKey.key;
  }
}
