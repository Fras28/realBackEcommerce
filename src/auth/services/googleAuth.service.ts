import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { User } from 'src/user/schema/user.schema';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthService {
  oauthClient: OAuth2Client;
  clientId: string;
  clientSecret: string;
  constructor(
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthService,
  ) {
    this.clientId = this.configService.get('GOOGLE_AUTH_CLIENT_ID');
    this.clientSecret = this.configService.get('GOOGLE_AUTH_CLIENT_SECRET');

    this.oauthClient = new OAuth2Client({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    });
  }

  async getUserData(token: string) {
    const ticket = await this.oauthClient.verifyIdToken({
      idToken: token,
      audience: this.clientId,
    });

    const payload = ticket.getPayload();

    return payload;
  }

  // Session
  // async getCookiesForUser(user: User) {
  //   const accessTokenCookie =
  //     this.authenticationService.getCookieWithJwtAccessToken(user.id);
  //   const { cookie: refreshTokenCookie, token: refreshToken } =
  //     this.authenticationService.getCookieWithJwtRefreshToken(user.id);

  //   await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

  //   return {
  //     accessTokenCookie,
  //     refreshTokenCookie,
  //   };
  // }

  async handleRegisteredUser(user: User) {
    if (!user.isRegisteredWithGoogle) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async registerUser(token: string, email: string) {
    const userData = await this.getUserData(token);
    const name = userData.name;

    const user = await this.usersService.createWithGoogle(email, name);

    return this.handleRegisteredUser(user);
  }

  async authenticate(token: string) {
    const ticket = await this.oauthClient.verifyIdToken({
      idToken: token,
      audience: this.clientId,
    });

    const { email } = ticket.getPayload();

    try {
      const user = await this.usersService.findByEmail(email);
      if (!user.isRegisteredWithGoogle) {
        throw new UnauthorizedException();
      }

      return this.handleRegisteredUser(user);
    } catch (error) {
      if (error.status !== 404) {
        throw new error();
      }

      return this.registerUser(token, email);
    }
  }
}
