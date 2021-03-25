import { config } from 'dotenv';
import { UserEntity } from './user/domain/user.entity';
import { RoomEntity } from './user/domain/room.entity';
import { ReportEntity } from './report/domain/report.entity';
import { ChatEntity } from './chat/domain/chat.entity';

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
    entities: [UserEntity, RoomEntity, ReportEntity, ChatEntity],
    synchronize: true,
  },
};
