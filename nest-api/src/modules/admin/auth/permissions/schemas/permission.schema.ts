import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type PermissionDoc = Permission & Document;

@Schema()
export class Permission {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  name: string;
  @ApiProperty()
  @Prop()
  description: string;
  @ApiProperty()
  @Prop({ default: () => new Date(), select: false })
  created: Date;
  @ApiProperty()
  @Prop({ default: () => new Date(), select: false })
  updated: Date;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
