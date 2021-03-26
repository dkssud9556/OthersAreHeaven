import config from '../config';

export const jwtConstants = {
  secret: config.jwt.secret,
  expiresIn: config.jwt.expiresIn,
};
