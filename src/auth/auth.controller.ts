import { Body, Controller, Post, Res, BadRequestException } from '@nestjs/common';
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
          return res.status(404).json({
            message: 'No se pudo crear el usuario o el usuario ya existe',
          });
        }
        return res.status(201).json({
             message: 'Usuario nuevo creado',
        });

    } catch (e) {
        throw new BadRequestException('Something bad happened', { cause: new Error(), description: 'Some error description' })
    }
  }
}
