import { ApiProperty } from '@nestjs/swagger';

export class SuccessMessageDto {
  @ApiProperty({ type: String })
  message = 'Success';
}
