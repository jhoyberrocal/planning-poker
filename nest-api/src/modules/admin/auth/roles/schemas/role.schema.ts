import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Permission } from '@modules/admin/auth/permissions/schemas/permission.schema';

export type RoleDoc = Role & Document;

@Schema()
export class Role {
  @ApiProperty()
  @Prop({ required: true })
  name: string;
  @ApiProperty()
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Permission.name,
        autopopulate: true,
      },
    ],
  })
  permissions: Permission[];
  @ApiProperty()
  @Prop({ default: () => new Date() })
  created: Date;
  @ApiProperty()
  @Prop({ default: () => new Date() })
  updated: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
