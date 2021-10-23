import * as Autopopulate from 'mongoose-autopopulate';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DB_ADMIN } from '@config/constants';
import { AdminModule } from '@modules/admin/admin.module';
import { AppController } from './app.controller';
import { EventsModule } from './events/events.module';

const optionsMongoose = {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectionFactory: connection => {
    connection.plugin(Autopopulate);
    return connection;
  },
};

@Module({
  imports: [
    AdminModule,
    MongooseModule.forRoot(process.env.DB_ADMIN, {
      connectionName: DB_ADMIN,
      ...optionsMongoose,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'www/dist'),
    }),
    EventsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
