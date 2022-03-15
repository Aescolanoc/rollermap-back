import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function createToken(user) {
  const tokenPayload = {
    email: user.email,
    id: user._id,
  };

  const secret = process.env.SECRET;
  return jwt.sign(tokenPayload, secret);
}

export function verifyToken(token) {
  const secret = process.env.SECRET;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return error.message;
  }
}

export function getTokenInfo(token) {
  const result = jwt.verify(token, process.env.SECRET);
  return result;
}
