import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Role } from '@modules/admin/auth/roles/schemas/role.schema';
import { Types } from 'mongoose';

export type UserDoc = User & Document;

@Schema()
export class User {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  lastname: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true, select: false })
  password: string;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Role.name,
    autopopulate: true,
  })
  role: Types.ObjectId;

  @ApiProperty()
  @Prop()
  dateHire: Date;

  @ApiProperty()
  @Prop()
  lastLogin: Date;

  @ApiProperty()
  @Prop({ default: () => new Date() })
  created: Date;

  @ApiProperty()
  @Prop({ default: () => new Date() })
  updated: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
