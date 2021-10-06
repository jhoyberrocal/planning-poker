import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateRoleDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly permissions: Types.ObjectId[];
}
