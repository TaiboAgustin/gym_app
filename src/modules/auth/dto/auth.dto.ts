import { Role } from 'src/common/enums/rol.enum';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @Matches(/[\W]/, {
    message: 'Password must contain special characters',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  membership: string;

  @IsString()
  role: Role;
}

export class Login {
  role: Role;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
// function Matches(
//   arg0: RegExp,
//   arg1: { message: string },
// ): (target: Signup, propertyKey: 'password') => void {
//   throw new Error('Function not implemented.');
// }
