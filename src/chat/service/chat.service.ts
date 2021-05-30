import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from '../schema/chat.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
  ) {}

  save(chatInfo: {
    content: string;
    senderEmail: string;
    roomId: string;
  }): Promise<ChatDocument | null> {
    const chat = new this.chatModel(chatInfo);
    return this.chatModel.create(chat);
  }
}
