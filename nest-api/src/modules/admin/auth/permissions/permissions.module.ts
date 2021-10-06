import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Permission,
  PermissionSchema,
} from '@modules/admin/auth/permissions/schemas/permission.schema';
import { DB_ADMIN } from '@config/constants';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Permission.name, schema: PermissionSchema }],
      DB_ADMIN,
    ),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
