import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  await app.use(
    session({
      secret: 'test',
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, secure: false },
    }),
  );
  await app.use(passport.initialize());
  await app.use(passport.session());
  await app.listen(5000);
}
bootstrap();
