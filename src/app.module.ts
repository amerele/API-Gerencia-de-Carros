import { Module } from '@nestjs/common';
import { AppController } from './presentation/controllers/app.controller';
import { CarsModule } from './domain/modules/cars.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from './domain/modules/users.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ReserveModule } from './domain/modules/reserves.module';

@Module({
  imports: [CarsModule, UsersModule, AuthModule, ReserveModule],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
})
export class AppModule {}
