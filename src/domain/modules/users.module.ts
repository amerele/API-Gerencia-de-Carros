import { Module } from '@nestjs/common';
import { UsersController } from 'src/presentation/controllers/users.controller';
import { UsersService } from 'src/application/services/users.service';
import { DatabaseModule } from './database.module';
import { userProviders } from '../providers/users.providers';
import { UsersRepository } from 'src/infraestructure/database/repositories/users.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...userProviders, UsersRepository],
  exports: [UsersService, UsersRepository],
  
  
})
export class UsersModule {}
