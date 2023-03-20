import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CookieAuthenticationGuard } from './auth/guards/cookie-authentication.guard';
import { UserModule } from './user/user.module';
import { NODE_ENV } from './app.constants';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: `./src/config/envs/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_DATABASE: Joi.string().required(),
        NODE_ENV: Joi.string()
          .required()
          .valid(NODE_ENV.DEVELOPMENT, NODE_ENV.PRODUCTION),
        SESSION_SECRET: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: CookieAuthenticationGuard },
  ],
})
export class AppModule {}
