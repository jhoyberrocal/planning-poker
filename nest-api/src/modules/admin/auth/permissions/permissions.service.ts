import { Injectable } from '@nestjs/common';
import { GlobalService } from '@config/global.service';
import {
  Permission,
  PermissionDoc,
} from '@modules/admin/auth/permissions/schemas/permission.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePermissionDto } from '@modules/admin/auth/permissions/dto/create-permission.dto';
import { UpdatePermissionDto } from '@modules/admin/auth/permissions/dto/update-permission.dto';

@Injectable()
export class PermissionsService extends GlobalService<
  PermissionDoc,
  CreatePermissionDto,
  UpdatePermissionDto
> {
  constructor(
    @InjectModel(Permission.name)
    private readonly PermissionModel: Model<PermissionDoc>,
  ) {
    super();
    this.modelSchema = this.PermissionModel;
  }
}
