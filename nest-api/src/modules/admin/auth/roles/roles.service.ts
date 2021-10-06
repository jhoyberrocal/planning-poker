import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GlobalService } from '@config/global.service';
import { Role, RoleDoc } from '@modules/admin/auth/roles/schemas/role.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RolesService extends GlobalService<
  RoleDoc,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(
    @InjectModel(Role.name) private readonly RoleModel: Model<RoleDoc>,
  ) {
    super();
    this.modelSchema = this.RoleModel;
  }
}
