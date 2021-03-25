import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './domain/user';
import { Repository } from 'typeorm';
import { SignUpRequest } from './dto/signUpRequest';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signUp(signUpRequest: SignUpRequest) {
    const user = this.userRepository.create({
      ...signUpRequest,
    });

    await this.userRepository.save(user);
  }
}
