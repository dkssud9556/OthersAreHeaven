import { config } from 'dotenv';
import { User } from './user/domain/user';
import { Room } from './user/domain/room';
import { Report } from './report/domain/report';
import { Chat } from './chat/domain/chat';

if (process.env.NODE_ENV !== 'production') {
  config();
}

export default {
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User, Room, Report, Chat],
    synchronize: true,
  },
};
