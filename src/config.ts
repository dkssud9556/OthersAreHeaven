import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config();
}

export default {
  database: {
    url: process.env.DB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
