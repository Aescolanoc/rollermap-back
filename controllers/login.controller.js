import { createToken } from '../services/auth.js';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';

export const login = async (req, resp, next) => {
  const userToCheck = req.body;
  const loginError = new Error('user or password invalid');
  loginError.status = 401;
  const userDb = await User.findOne({ email: userToCheck.email });

  if (!userToCheck.email || !userToCheck.password) {
    next(new Error(loginError));
  } else {
    if (userDb) {
      if (bcrypt.compareSync(userToCheck.password, userDb.password)) {
        const token = createToken({
          email: userDb.email,
          id: userDb._id,
        });
        resp.json({
          token,
          email: userDb.email,
          name: userDb.name,
          id: userDb._id,
          friends: userDb.favorites,
          enemies: userDb.myrollerplaces,
        });
      } else {
        next(new Error(loginError));
      }
    } else {
      next(new Error(loginError));
    }
  }
};
