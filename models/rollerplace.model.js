import mongoose from 'mongoose';

export const rollerplaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: Array, required: true },
  type: { type: String, required: true },
  slalom: { type: Boolean, required: true },
  city: { type: String, required: true },
  image: { type: String, required: true },
  level: { type: String, required: true },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

export const RollerPlace = mongoose.model('RollerPlace', rollerplaceSchema);
