import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { User } from '@modules/admin/auth/users/schemas/user.schema';

export type NotificationDoc = Notification & Document;

@Schema()
export class Notification {
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  receiverId: Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    autopopulate: true,
  })
  senderId: Types.ObjectId;
  @ApiProperty()
  @Prop({ required: true, default: false })
  seen: boolean;
  @ApiProperty()
  @Prop({ required: true })
  message: string;
  @ApiProperty()
  @Prop({ default: () => new Date() })
  created: Date;
  @ApiProperty()
  @Prop({ default: () => new Date() })
  updated: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
