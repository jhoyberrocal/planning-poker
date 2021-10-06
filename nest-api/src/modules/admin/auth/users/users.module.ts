import * as bcrypt from 'bcrypt';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@modules/admin/auth/users/schemas/user.schema';
import { DB_ADMIN } from '@config/constants';

@Module({
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: User.name,
          useFactory: () => {
            const schema = UserSchema;
            schema.pre<User>('save', function (next) {
              const salt = bcrypt.genSaltSync(10);
              this.password = bcrypt.hashSync(this.password, salt);
              next();
            });
            return schema;
          },
        },
      ],
      DB_ADMIN,
    ),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
