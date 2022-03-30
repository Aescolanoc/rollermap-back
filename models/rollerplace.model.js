import mongoose from 'mongoose';

export const rollerplaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: Array, required: true },
  trace: { type: Array },
  type: { type: String, required: true },
  slalom: { type: Boolean, required: true },
  city: { type: String, required: true },
  image: { type: String },
  level: { type: String, required: true },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

export const RollerPlace = mongoose.model('RollerPlace', rollerplaceSchema);
