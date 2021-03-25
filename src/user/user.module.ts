import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { RoomEntity } from './domain/room.entity';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoomEntity])],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class UserModule {}
