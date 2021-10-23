import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_ADMIN } from '@config/constants';
import { Role, RoleSchema } from '@modules/admin/auth/roles/schemas/role.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }], DB_ADMIN)],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
