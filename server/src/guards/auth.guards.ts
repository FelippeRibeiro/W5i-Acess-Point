import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './../auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (token) {
      const data = this.authService.checkToken(token.split(' ')[1]);
      const user = await this.userService.findById(data.sub);
      request.user = user;
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
