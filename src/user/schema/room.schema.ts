import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ type: Types.ObjectId, required: true })
  id: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
