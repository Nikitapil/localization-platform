import { ApiProperty } from '@nestjs/swagger';
import { TextLangFromDb } from '../../types';

export class TextLangDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  createdAt: Date;

  @ApiProperty({ type: String })
  updatedAt: Date;

  constructor(langFromDb: TextLangFromDb) {
    this.id = langFromDb.id;
    this.name = langFromDb.name;
    this.createdAt = langFromDb.createdAt;
    this.updatedAt = langFromDb.updatedAt;
  }
}
