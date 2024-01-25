import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject() private readonly authService: AuthService) {
    super();
  }

  serializeUser(user, done) {
    console.log('Serializer User');
    done(null, user);
  }

  async deserializeUser(payload: any, done) {
    const user = await this.authService.findUser(payload.id);
    console.log('Deserialize User');
    console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}
