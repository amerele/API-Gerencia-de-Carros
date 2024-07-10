import { Module } from '@nestjs/common';
import { AppController } from '../../presentation/controllers/app.controller';
import { CatsModule } from './cars.module';
import { CarsController } from 'src/presentation/controllers/cars.controller';

@Module({
  imports: [],
  controllers: [AppController, CarsController],
  providers: [CatsModule],
})
export class AppModule {}
