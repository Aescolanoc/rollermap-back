import { createToken } from '../services/auth.js';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';

export const login = async (req, resp, next) => {
  const userToCheck = req.body;
  const loginError = new Error('user or password invalid');
  loginError.status = 401;

  if (!userToCheck.email || !userToCheck.password) {
    next(loginError);
  } else {
    const userDb = await User.findOne({ email: userToCheck.email }).populate([
      'favorites',
      'myrollerplaces',
    ]);
    if (!userDb) {
      next(loginError);
    } else if (!bcrypt.compareSync(userToCheck.password, userDb.password)) {
      next(loginError);
    } else {
      const token = createToken({
        email: userDb.email,
        id: userDb._id,
      });
      resp.json({
        token,
        id: userDb._id,
        email: userDb.email,
        name: userDb.name,
        favorites: userDb.favorites,
        myrollerplaces: userDb.myrollerplaces,
      });
    }
  }
};
