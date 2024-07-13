import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb+srv://brunog:lY19oN7PxpEZy5ck@cluster0.mpuo6i9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
  },
];