import mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({
  year: Number,
  model: String,
  categorie: String,
  mileage: String,
  avaliable: Boolean,
  reservedUser: String || null
});
