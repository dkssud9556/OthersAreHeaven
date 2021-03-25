import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './domain/chat';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
})
export class ChatModule {}
