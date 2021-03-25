import { Body, Controller, Post } from '@nestjs/common';
import { SignUpRequest } from '../dto/signUpRequest';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpRequest: SignUpRequest): Promise<void> {
    return this.authService.signUp(signUpRequest);
  }
}
