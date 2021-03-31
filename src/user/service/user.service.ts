import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findOne(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async save(userInfo: { email: string; password: string }) {
    const user = new this.userModel(userInfo);
    await user.save();
  }
}
