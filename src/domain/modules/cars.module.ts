import { Module } from '@nestjs/common';
import { CarsController } from 'src/presentation/controllers/cars.controller';
import { CarsService } from 'src/application/services/cars.service';
import { carsProviders } from '../providers/cats.providers';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CarsController],
  providers: [
    CarsService,
    ...carsProviders,
  ],
})
export class CatsModule {}