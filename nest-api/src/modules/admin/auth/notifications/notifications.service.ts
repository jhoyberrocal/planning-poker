import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { GlobalService } from '@config/global.service';
import {
  Notification,
  NotificationDoc,
} from '@modules/admin/auth/notifications/schemas/notification.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotificationsService extends GlobalService<
  NotificationDoc,
  CreateNotificationDto,
  UpdateNotificationDto
> {
  constructor(
    @InjectModel(Notification.name)
    private readonly NotificationModel: Model<NotificationDoc>,
  ) {
    super();
    this.modelSchema = this.NotificationModel;
  }
}
