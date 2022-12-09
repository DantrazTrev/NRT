import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/user.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    const userName = username.toLowerCase();
    const user = await this.userService.login(userName, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
