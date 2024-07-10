import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/infraestructure/config/connection';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}