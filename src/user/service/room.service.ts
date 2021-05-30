import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from '../schema/room.schema';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  findOne(id: string): Promise<RoomDocument | null> {
    return this.roomModel.findOne({ id }).exec();
  }

  save(): Promise<RoomDocument | null> {
    const room = new this.roomModel({ id: uuid() });
    return this.roomModel.create(room);
  }
}
