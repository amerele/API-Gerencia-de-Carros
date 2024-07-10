import { Connection } from 'mongoose';
import { CarSchema } from 'src/infraestructure/database/models/car.schema';

export const carsProviders = [
  {
    provide: 'CAR_MODEL',
    useFactory: (connection: Connection) => connection.model('Cat', CarSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];