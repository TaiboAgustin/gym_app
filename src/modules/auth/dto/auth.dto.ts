import { Role } from 'src/common/enums/rol.enum';

export class CreateUserDto {
  name: string;
  lastName: string;
  age: number;
  height: number;
  weight: number;
  genre: string;
  membership: string;
  email: string;
  password: string;
  role: Role;
}
