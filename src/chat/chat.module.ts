import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './domain/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity])],
})
export class ChatModule {}
