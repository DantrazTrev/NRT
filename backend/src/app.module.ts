import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/user.module';
import { MessageGateway } from './message/message.gateway';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'tetrapak',
      password: 'cowmemes',
      database: 'chatapp',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessageGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
