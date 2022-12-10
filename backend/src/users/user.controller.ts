import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Req,
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
    @Request() req,
    @Body('name') name: string,
    @Body('alias') alias: string,
    @Body('password') password: string,
  ) {
    console.log(req.cookies); // undefined

    return this.userService.create(name, alias, password);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @Header('Access-Control-Allow-Origin', 'http://localhost:3000')
  @Header('Access-Control-Allow-Credentials', 'true')
  async login(@Request() req) {
    return { User: req.alias, msg: 'User logged in' };
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
