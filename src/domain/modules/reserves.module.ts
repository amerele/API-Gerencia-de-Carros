import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { ReserveController } from 'src/presentation/controllers/reserves.controller';
import { ReserveService } from 'src/application/services/reserves.service';
import { reserveProviders } from '../providers/reserves.providers';
import { ReserveRepository } from 'src/infraestructure/database/repositories/reserves.repository';
import { UsersService } from 'src/application/services/users.service';
import { userProviders } from '../providers/users.providers';
import { UsersRepository } from 'src/infraestructure/database/repositories/users.repository';
import { carsProviders } from '../providers/cats.providers';
import { CarsService } from 'src/application/services/cars.service';
import { CarsRepository } from 'src/infraestructure/database/repositories/cars.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ReserveController],
  providers: [
    ReserveService,
    ReserveRepository,
    ...reserveProviders,
    UsersService,
    ...userProviders,
    UsersRepository,
    CarsService,
    CarsRepository,
    ...carsProviders,
  ],
  exports: [ReserveService, ReserveRepository, UsersService, UsersRepository],
})
export class ReserveModule {}
