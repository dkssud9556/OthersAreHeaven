import { IsEmail, IsString } from 'class-validator';

export class SignUpRequest {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
