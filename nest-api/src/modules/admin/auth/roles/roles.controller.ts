import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/admin/auth/guards/jwt.guard';
import { Permissions } from '@config/permissions.decorator';
import { PermissionsGuard } from '@modules/admin/auth/guards/permissions.guard';
import { PERMS } from '@config/permissions';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiTags('Users Auth - Roles')
@ApiBearerAuth()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Permissions(PERMS.roles.create, PERMS.roles.all)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Permissions(PERMS.roles.read, PERMS.roles.all)
  @Get('all')
  findAll() {
    return this.rolesService.findAll();
  }

  @Permissions(PERMS.roles.read, PERMS.roles.all)
  @Get()
  findPaginate(@Query() query) {
    return this.rolesService.findPaginate(query.rows, query.page, query);
  }

  @Permissions(PERMS.roles.read, PERMS.roles.all)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Permissions(PERMS.roles.update, PERMS.roles.all)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Permissions(PERMS.roles.delete, PERMS.roles.all)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
