import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  senderEmail: string;

  @Prop({ required: true })
  roomId: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
