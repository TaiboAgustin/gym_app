import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/modules/user/models/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/auth.dto';
import { hashPassword, comparePassword } from './bcrypt/password.crypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtTokenService: JwtService,
  ) {}

  async validateUserCredentials(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }
    const passwordMatch = await comparePassword(password, user.password);

    if (passwordMatch) {
      return user;
    }
    throw new NotAcceptableException('Password invalid');
  }

  async LogIn(user: any) {
    const payload = {
      username: user.name,
      sub: user._id,
      rol: user.role,
    };

    const jwtToken = this.jwtTokenService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    return { message: `Logged successfully, ${user.name}`, jwtToken };
  }

  async SignUp(body: CreateUserDto) {
    const {
      name,
      lastName,
      age,
      height,
      weight,
      email,
      password,
      genre,
      membership,
      role,
    } = body;
    const userFound = await this.userModel.findOne({ email });
    if (userFound) {
      throw new UnauthorizedException('Email already exists');
    }
    const passwordHashed = await hashPassword(password);
    await this.userModel.create({
      name,
      lastName,
      age,
      height,
      weight,
      email,
      password: passwordHashed,
      genre,
      membership,
      role,
    });
    return { message: 'User created successfully' };
  }
}
