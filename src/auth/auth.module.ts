import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './controller/auth.controller';
import { GoogleAuthController } from './controller/googleAuth.controller';
import { AuthService } from './services/auth.service';
import { GoogleAuthService } from './services/googleAuth.service';
import { SessionSerializer } from './services/session.serializer';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    SessionSerializer,
    GoogleAuthService,
  ],
  exports: [AuthService],
  controllers: [AuthController, GoogleAuthController],
})
export class AuthModule {}
