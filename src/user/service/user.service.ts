import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../domain/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findOne(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ email });
  }

  async save({ email, password }: { email: string; password: string }) {
    const user = this.userRepository.create({
      email,
      password,
    });
    await this.userRepository.save(user);
  }
}
