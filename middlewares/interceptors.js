import { RollerPlace } from '../models/rollerplace.model.js';
import { verifyToken } from '../services/auth.js';

export const loginRequired = (req, res, next) => {
  const authorization = req.get('authorization');
  console.log(authorization);
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
  const rollerPlaceId = req.params.id;
  const userId = req.tokenPayload.id;
  const rollerPlace = await RollerPlace.findById(rollerPlaceId);
  if (rollerPlace?.author.toString() === userId) {
    next();
  } else {
    const userError = new Error('not authorized user');
    userError.status = 401;
    next(userError);
  }
};

export const loggedUserRequired = async (req, res, next) => {
  const userToUpdateId = req.params.id;
  const userLoggedId = req.tokenPayload.id;
  if (userLoggedId === userToUpdateId) {
    next();
  } else {
    const userError = new Error('not authorized user');
    userError.status = 401;
    next(userError);
  }
};
