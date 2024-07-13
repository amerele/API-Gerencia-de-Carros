import { Module } from '@nestjs/common';
import { CarsController } from 'src/presentation/controllers/cars.controller';
import { CarsService } from 'src/application/services/cars.service';
import { carsProviders } from '../providers/cats.providers';
import { DatabaseModule } from './database.module';
import { CarsRepository } from 'src/infraestructure/database/repositories/cars.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CarsController],
  providers: [CarsService, ...carsProviders, CarsRepository],
  exports: [CarsService, CarsRepository]
})
export class CarsModule {}
