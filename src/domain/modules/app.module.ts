import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../../presentation/controllers/app.controller';
import { CarsModule } from './cars.module';
import { CarsController } from 'src/presentation/controllers/cars.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from './users.module';
import { UsersController } from 'src/presentation/controllers/users.controller';

@Module({
  imports: [
    CarsModule,
  ],
  controllers: [AppController, CarsController],
  providers: [],
})
export class AppModule {}
