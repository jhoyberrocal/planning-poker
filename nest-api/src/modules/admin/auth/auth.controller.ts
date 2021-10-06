import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@modules/admin/auth/auth.service';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '@modules/admin/auth/guards/local.guard';
import { User } from '@modules/admin/auth/users/schemas/user.schema';
import { UsersService } from '@modules/admin/auth/users/users.service';
import { JwtAuthGuard } from '@modules/admin/auth/guards/jwt.guard';
import { LoginDto } from '@modules/admin/auth/users/dto/login.dto';

@ApiTags('Users Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return { token: await this.authService.login(req.user), user: req.user };
  }

  @ApiResponse({ type: User })
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(@Request() req) {
    return { user: await this.usersService.findOne(req.user.userId) };
  }

  @ApiResponse({ type: Boolean })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req) {
    req.user = null;
    return true;
  }
}
