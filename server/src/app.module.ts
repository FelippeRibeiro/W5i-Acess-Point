import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PointModule } from './point/point.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule, PointModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
