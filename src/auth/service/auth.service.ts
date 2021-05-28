import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpRequest } from '../dto/sign.up.request';
import { PasswordService } from './password.service';
import { LoginRequest } from '../dto/login.request';
import { UserDocument } from '../../user/schema/user.schema';
import config from '../../config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async signUp(signUpRequest: SignUpRequest) {
    if (await this.findUserByEmail(signUpRequest.email)) {
      throw new HttpException('User email already exist', HttpStatus.CONFLICT);
    }
    const hashedPassword = await this.passwordService.hash(
      signUpRequest.password,
    );
    await this.userService.save({
      email: signUpRequest.email,
      password: hashedPassword,
    });
  }

  async login(loginRequest: LoginRequest) {
    const user = await this.findUserByEmail(loginRequest.email);
    await this.validateLoginInfo(user, loginRequest);
    return {
      accessToken: this.jwtService.sign({ email: user.email }),
    };
  }

  validateToken(token: string) {
    return this.jwtService.verifyAsync(token, { secret: config.jwt.secret });
  }

  private async validateLoginInfo(
    user: UserDocument,
    loginRequest: LoginRequest,
  ): Promise<void> {
    if (
      !user ||
      !(await this.passwordService.match(loginRequest.password, user.password))
    ) {
      throw new HttpException('Invalid login info', HttpStatus.UNAUTHORIZED);
    }
  }

  private findUserByEmail(email: string): Promise<UserDocument> {
    return this.userService.findOne(email);
  }
}
