import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: false })
  isSuspended: boolean;

  @Prop({ type: Types.ObjectId })
  roomId: string;

  @Prop()
  socketId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
