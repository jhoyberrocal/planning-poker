import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from '@modules/admin/auth/strategies/local.strategy';
import { AuthController } from '@modules/admin/auth/auth.controller';
import { JwtStrategy } from '@modules/admin/auth/strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '@modules/admin/auth/users/users.module';
import { RolesModule } from '@modules/admin/auth/roles/roles.module';
import { PermissionsModule } from '@modules/admin/auth/permissions/permissions.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PermissionsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '6h',
      },
    }),
    NotificationsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
