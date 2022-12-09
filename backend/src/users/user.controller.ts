import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local.guard';
import { UsersService } from './user.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  ping() {
    return 'Hei';
  }

  @Post('register')
  async createUser(
    @Body('name') name: string,
    @Body('alias') alias: string,
    @Body('password') password: string,
  ) {
    return this.userService.create(name, alias, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body('alias') alias: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.login(alias, password);
    return { alias: user.alias, name: user.name, id: user.userId };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getUser(@Request() req): string {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/update')
  updateUser(@Request() req) {
    return this.userService.updateProfile(req.user.alias, req.user.name);
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}
