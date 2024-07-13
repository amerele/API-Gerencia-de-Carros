import { Module } from '@nestjs/common';
import { CarsController } from 'src/presentation/controllers/cars.controller';
import { CarsService } from 'src/application/services/cars.service';
import { carsProviders } from '../providers/cats.providers';
import { DatabaseModule } from './database.module';
import { CarsRepository } from 'src/infraestructure/database/repositories/cars.repository';
import { UsersService } from 'src/application/services/users.service';
import { userProviders } from '../providers/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CarsController],
  providers: [
    CarsService,
    CarsRepository,
    UsersService,
    ...carsProviders,
    ...userProviders,
  ],
  exports: [CarsService, CarsRepository, UsersService],
})
export class CarsModule {}
