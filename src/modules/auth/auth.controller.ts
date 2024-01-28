import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './guards/google.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google auth' };
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect(@Req() req, @Res() res: Response) {
    const user = req.user;
    return res.json({ user });
  }

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto, @Res() res: Response) {
    try {
      const sign = await this.authService.SignUp(body);
      if (!sign) {
        return res.status(404).json({ message: 'Signup failed' });
      }
      res.status(201).json({ message: 'SignUp successfully' });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() req, @Res() res: Response) {
    try {
      const result = await this.authService.LogIn(req.user);
      res.status(200).json(result);
    } catch (error) {
      throw error;
    }
  }
}
