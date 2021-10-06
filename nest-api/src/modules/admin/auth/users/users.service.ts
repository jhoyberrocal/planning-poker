import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDoc } from '@modules/admin/auth/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GlobalService } from '@config/global.service';

@Injectable()
export class UsersService extends GlobalService<
  UserDoc,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectModel(User.name) private readonly UsersModel: Model<UserDoc>,
  ) {
    super();
    this.modelSchema = this.UsersModel;
  }

  async findOneLogin(email: string): Promise<User | any> {
    return this.UsersModel.findOne({ email }).select('+password').exec();
  }
}
