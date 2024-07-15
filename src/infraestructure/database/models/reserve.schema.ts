import mongoose from 'mongoose';

export const ReserveSchema = new mongoose.Schema({
  startDate: String,
  endDate: String,
  carId: String,
  userId: String,
  username: String,
  status: String
});
