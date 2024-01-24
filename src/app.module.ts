import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://gnoboca:42180329Gnoboc@cluster0.vy7ivdw.mongodb.net/GYM',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
