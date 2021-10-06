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
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from '@modules/admin/auth/permissions/schemas/permission.schema';
import { JwtAuthGuard } from '@modules/admin/auth/guards/jwt.guard';
import { PermissionsGuard } from '@modules/admin/auth/guards/permissions.guard';
import { Permissions } from '@config/permissions.decorator';
import { PERMS } from '@config/permissions';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiTags('Users Auth - Permissions')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Permissions(PERMS.permissions.create, PERMS.permissions.all)
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return await this.permissionsService.create(createPermissionDto);
  }

  @Permissions(PERMS.permissions.read, PERMS.permissions.all)
  @ApiResponse({ type: [Permission] })
  @Get('all')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Permissions(PERMS.permissions.read, PERMS.permissions.all)
  @Get()
  findPaginate(@Query() query) {
    return this.permissionsService.findPaginate(query.rows, query.page, query);
  }

  @Permissions(PERMS.permissions.read, PERMS.permissions.all)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.permissionsService.findOne(id);
  }

  @Permissions(PERMS.permissions.update, PERMS.permissions.all)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return await this.permissionsService.update(id, updatePermissionDto);
  }

  @Permissions(PERMS.permissions.delete, PERMS.permissions.all)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return { success: await this.permissionsService.remove(id) };
  }
}
