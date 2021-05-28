import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findOne(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateSocketId(email: string, socketId: string) {
    await this.userModel.updateOne({ email }, { socketId });
  }

  async updateEmptySocketId(email: string) {
    await this.userModel.updateOne({ email }, { socketId: null });
  }

  async save(userInfo: { email: string; password: string }): Promise<void> {
    const user = new this.userModel(userInfo);
    await user.save();
  }
}
