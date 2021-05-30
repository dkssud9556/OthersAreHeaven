import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Room, RoomSchema } from './schema/room.schema';
import { RoomService } from './service/room.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, RoomService],
  exports: [UserService, RoomService],
})
export class UserModule {}
