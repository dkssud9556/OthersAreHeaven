import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/user';
import { Room } from './domain/room';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Room])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class UserModule {}
