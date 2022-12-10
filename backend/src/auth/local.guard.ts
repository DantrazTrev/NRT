import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/user.service';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log(err, info, user);
    if (err || !user) {
      throw err;
    }
    return user;
  }
}
