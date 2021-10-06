import * as Autopopulate from 'mongoose-autopopulate';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DB_ADMIN } from '@config/constants';
import { AdminModule } from '@modules/admin/admin.module';
import { AppController } from './app.controller';

const optionsMongoose = {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectionFactory: (connection) => {
        connection.plugin(Autopopulate);
        return connection;
    },
};

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: join(__dirname, '../../', '.env'),
        }),
        MongooseModule.forRoot(process.env.DB_ADMIN, {
            connectionName: DB_ADMIN,
            ...optionsMongoose,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../', 'www/dist'),
        }),
        AdminModule,
    ],
    controllers: [AppController],
})
export class AppModule {
}
