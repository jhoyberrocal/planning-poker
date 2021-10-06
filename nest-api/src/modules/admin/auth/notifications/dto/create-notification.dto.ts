import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateNotificationDto {
  @ApiProperty()
  readonly message: string;
  @ApiProperty()
  readonly receiverId: Types.ObjectId;
  @ApiProperty()
  readonly senderId: Types.ObjectId;
}
