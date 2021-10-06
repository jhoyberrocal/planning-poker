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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/admin/auth/guards/jwt.guard';
import { PermissionsGuard } from '@modules/admin/auth/guards/permissions.guard';
import * as bcrypt from 'bcrypt';
import { Permissions } from '@config/permissions.decorator';
import { PERMS } from '@config/permissions';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiTags('Users Auth - Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Permissions(PERMS.users.create, PERMS.users.all)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Permissions(PERMS.users.read, PERMS.users.all)
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Permissions(PERMS.users.read, PERMS.users.all)
  @Get('')
  async findPaginate(@Query() query) {
    return this.usersService.findPaginate(query.rows, query.page, query);
  }

  @Permissions(PERMS.users.read, PERMS.users.all)
  @Get(':id')
  findOne(@Param('id') email: string) {
    return this.usersService.findOneLogin(email);
  }

  @Permissions(PERMS.users.update, PERMS.users.all)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateDto = { ...updateUserDto };
    if (updateUserDto.password) {
      const salt = bcrypt.genSaltSync(10);
      updateDto['password'] = bcrypt.hashSync(updateUserDto.password, salt);
    }
    return this.usersService.update(id, updateDto);
  }

  @Permissions(PERMS.users.delete, PERMS.users.all)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
