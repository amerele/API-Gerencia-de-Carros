import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://amerele:CrWEyzGjeNAdsUy3@happcars.uvfn6ey.mongodb.net/?retryWrites=true&w=majority&appName=HappCars'),
  },
];