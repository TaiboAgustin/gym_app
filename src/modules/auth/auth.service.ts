import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/modules/user/models/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async SignUp(body: CreateUserDto) {
    const { email } = body;
    const userFound = await this.userModel.findOne({ email });
    if (userFound) {
      throw new UnauthorizedException('Email already exists');
    }
    await this.userModel.create(body);
    return { message: 'User created successfully' };
  }
}
