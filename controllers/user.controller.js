import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const insertUser = async (req, res, next) => {
  try {
    const encryptedpassword = bcrypt.hashSync(req.body.password);
    const userData = { ...req.body, password: encryptedpassword };
    const newUser = new User(userData);
    const result = await newUser.save();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const resp = await User.findOne({ _id: req.params.id });
    res.json(resp);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const resp = await User.findOneAndUpdate(
      { email: req.tokenPayload.email },
      req.body
    );
    res.json(resp);
  } catch (error) {
    next(error);
  }
};
