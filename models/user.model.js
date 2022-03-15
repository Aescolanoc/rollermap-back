import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'RollerPlace',
    },
  ],
  myrollerplaces: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'RollerPlace',
    },
  ],
});

export const User = mongoose.model('User', userSchema);
