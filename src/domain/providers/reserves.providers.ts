import { Connection } from 'mongoose';
import { ReserveSchema } from 'src/infraestructure/database/models/reserve.schema';

export const reserveProviders = [
  {
    provide: 'RESERVE_MODEL',
    useFactory: (connection: Connection) => connection.model('Reserve', ReserveSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];