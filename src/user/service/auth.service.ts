import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user.entity';
import { Repository } from 'typeorm';
import { SignUpRequest } from '../dto/signUpRequest';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpRequest: SignUpRequest) {
    const user = this.userRepository.create({
      ...signUpRequest,
    });

    await this.userRepository.save(user);
  }
}
