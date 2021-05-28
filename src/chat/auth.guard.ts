import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.switchToWs().getData();
    const client = context.switchToWs().getClient();
    return this.authService
      .validateToken(token)
      .then((payload) => {
        client.request.email = payload.email;
        return true;
      })
      .catch(() => false);
  }
}
