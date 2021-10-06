import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateUserDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly lastname: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly role?: Types.ObjectId;
  @ApiProperty()
  readonly dateHire: Date;
  @ApiProperty()
  readonly lastLogin?: Date;
  @ApiProperty()
  readonly created?: Date;
  @ApiProperty()
  readonly updated?: Date;
}
