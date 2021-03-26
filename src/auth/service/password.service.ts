import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10));
  }

  async match(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(rawPassword, hashedPassword);
  }
}
