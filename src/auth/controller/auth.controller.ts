import { Bind, Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { SignUpRequest } from '../dto/sign.up.request';
import { LoginRequest } from '../dto/login.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpRequest: SignUpRequest) {
    return this.authService.signUp(signUpRequest);
  }

  @Post()
  @Bind(Req())
  login(@Body() loginRequest: LoginRequest) {
    return this.authService.login(loginRequest);
  }
}
