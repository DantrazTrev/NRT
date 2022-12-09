import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './user.controller';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../auth/local.strategy';
import { SessionSerializer } from 'src/auth/session.serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
  ],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, SessionSerializer],
  exports: [TypeOrmModule],
})
export class UsersModule {}
