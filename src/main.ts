import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
const MongoStore = require('connect-mongo');
import helmet from 'helmet';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { NODE_ENV } from './app.constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
  });
  app.set('trust proxy', 1);
  const configService = app.get(ConfigService);
  const mongoUsername = configService.get<string>('MONGO_USERNAME');
  const mongoPassword = configService.get<string>('MONGO_PASSWORD');
  const mongoPort = configService.get<number>('MONGO_PORT');
  const mongoDbName = configService.get<string>('MONGO_DATABASE');
  const mongoConnection = configService.get<string>('MONGO_URI');
  const sessionSecret = configService.get<string>('SESSION_SECRET');
  const enviroment = configService.get<string>('NODE_ENV');
  const uri =
    enviroment === NODE_ENV.DEVELOPMENT
      ? `${mongoConnection}://${mongoUsername}:${mongoPort}`
      : `${mongoConnection}://${mongoUsername}:${mongoPassword}@${mongoDbName}`;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.use(helmet());
  app.use(
    session({
      name: 'nest-js-api',
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        path: '/',
        httpOnly: true,
        secure: enviroment === NODE_ENV.DEVELOPMENT ? false : true,
        sameSite: 'none',
      },
      store: MongoStore.create({
        mongoUrl: uri,
        dbName: mongoDbName,
        collectionName: 'sessions',
        ttl: 24 * 60 * 60,
        autoRemove: 'native',
        stringify: true,
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(4000);
}
bootstrap();
