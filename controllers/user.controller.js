import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createError } from '../services/errors.js';

export const insertUser = async (req, res, next) => {
  try {
    const encryptedpassword = bcrypt.hashSync(req.body.password);
    const userData = { ...req.body, password: encryptedpassword };
    const newUser = new User(userData);
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (error) {
    next(createError(error));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const resp = await User.findById({ _id: req.tokenPayload.id });
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const resp = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
};
