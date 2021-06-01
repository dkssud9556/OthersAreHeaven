import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async initSocketIdAndRoomId() {
    await this.userModel.updateMany(
      {},
      { $set: { socketId: null, roomId: null } },
    );
  }

  findOne(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  findMatchingUsers(): Promise<UserDocument[]> {
    return this.userModel
      .find({ $and: [{ roomId: null }, { socketId: { $ne: null } }] })
      .exec();
  }

  async updateSocketId(email: string, socketId: string) {
    await this.userModel.updateOne({ email }, { socketId });
  }

  async updateEmptySocketId(email: string) {
    await this.userModel.updateOne({ email }, { socketId: null });
  }

  async updateRoomId(emails: string[], roomId: string) {
    await this.userModel.updateMany({ email: { $in: emails } }, { roomId });
  }

  async save(userInfo: { email: string; password: string }): Promise<void> {
    const user = new this.userModel(userInfo);
    await user.save();
  }

  async updateEmptyRoomId(email: string) {
    await this.userModel.updateOne({ email }, { roomId: null });
  }

  findOneByRoomId(roomId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ roomId }).exec();
  }
}
