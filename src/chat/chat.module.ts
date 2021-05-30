import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './schema/chat.schema';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from './auth.guard';
import { UserModule } from '../user/user.module';
import { ChatService } from './service/chat.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    AuthModule,
    UserModule,
  ],
  providers: [ChatGateway, AuthGuard, ChatService],
})
export class ChatModule {}
