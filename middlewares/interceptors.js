import { RollerPlace } from '../models/rollerplace.model.js';
import { User } from '../models/user.model.js';
import { verifyToken } from '../services/auth.js';

export const loginRequired = (req, res, next) => {
  const authorization = req.get('authorization');
  let token;
  const tokenError = new Error('token missing or invalid');
  tokenError.status = 401;
  let decodedToken;
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
    decodedToken = verifyToken(token);
    if (typeof decodedToken === 'string') {
      next(tokenError);
    } else {
      req.tokenPayload = decodedToken;
      next();
    }
  } else {
    next(tokenError);
  }
};

export const isAuthor = async (req, res, next) => {
  const userEmail = req.tokenPayload.email;
  const userToCheck = await User.findOne({ email: userEmail });
  const rollerplaceToCheck = await RollerPlace.findOne({ _id: req.paramas.id });
  if (userToCheck._id === rollerplaceToCheck.author) {
    next();
  } else {
    const userError = new Error('not authorized user');
    userError.status = 401;
    next(userError);
  }
};
