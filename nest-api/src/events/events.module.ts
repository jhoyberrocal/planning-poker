import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { DbService } from '@db/db.service';

@Module({
  providers: [EventsGateway, DbService],
})
export class EventsModule {}
