import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const result = await this.authService.SignUp(createUserDto);
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(201).json(result);
    } catch (e) {
      const statusCode = e?.getStatus() || 500;
      const errorMessage = e?.message || 'Internal Server Error';
      return res.status(statusCode).json({ message: errorMessage });
    }
  }
}
