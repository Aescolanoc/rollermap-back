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
