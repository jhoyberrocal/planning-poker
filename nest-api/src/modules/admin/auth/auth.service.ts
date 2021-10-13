import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@modules/admin/auth/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@modules/admin/auth/users/dto/create-user.dto';
import { User } from '@modules/admin/auth/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneLogin(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (user && passwordMatch) {
      return await this.usersService.update(user._id, {
        lastLogin: new Date(),
      });
    }

    return null;
  }

  async login(
    user: User & {
      _id: string;
      permissions: string[];
      role: { name: string; permissions: any };
    },
  ) {
    const payload = {
      user: {
        email: user.email,
        role: user.role.name,
        permissions: user.role.permissions.map(({ name }) => name),
      },
      sub: user._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
