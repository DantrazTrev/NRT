import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  //validate a user
  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(userName);
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return {
        userId: user.userId,
        userName: user.alias,
      };
    }

    return null;
  }
}
