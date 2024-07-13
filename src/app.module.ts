import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './presentation/controllers/app.controller';
import { CarsModule } from './domain/modules/cars.module';
import { CarsController } from 'src/presentation/controllers/cars.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from './domain/modules/users.module';
import { UsersController } from './presentation/controllers/users.controller';

@Module({
  imports: [
    CarsModule,
    UsersModule
  ],
  controllers: [AppController, CarsController, UsersController],
  providers: [],
})
export class AppModule {}
