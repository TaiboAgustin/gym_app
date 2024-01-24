import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/models/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async SignUp(body: CreateUserDto) {
    const {
      name,
      lastName,
      age,
      height,
      weight,
      genre,
      membership,
      email,
      password,
      rol,
    } = body;

    const userFound = await this.userModel.findOne({ email });

    if (userFound) {
      return false
    }
    await this.userModel.create(body);
    return true
  }
}
