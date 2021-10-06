import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { JwtAuthGuard } from '@modules/admin/auth/guards/jwt.guard';
import { PermissionsGuard } from '@modules/admin/auth/guards/permissions.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MeGuard } from '@modules/admin/auth/guards/me.guard';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiTags('Users Auth - Notificaciones')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @UseGuards(MeGuard)
  @Get()
  findPaginate(@Query() query) {
    const queryParsed = { ...query };
    if (query.userId) {
      delete queryParsed.userId;
    }
    return this.notificationsService.findPaginate(
      query.rows,
      query.page,
      queryParsed,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}
