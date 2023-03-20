import {
  Controller,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Req,
} from '@nestjs/common';
import { TokenVerificationDto } from '../dto/tokenVerification.dto';
import { GoogleAuthService } from '../services/googleAuth.service';
import { Request } from 'express';
import { Public } from 'src/publicRoute';

@Controller('google-auth')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthService,
  ) {}

  @Public()
  @Post()
  async authenticate(
    @Body() tokenData: TokenVerificationDto,
    @Req() request: Request,
  ) {
    const user = await this.googleAuthenticationService.authenticate(
      tokenData.token,
    );

    // request.res.setHeader('Set-Cookie', [
    //   accessTokenCookie,
    //   refreshTokenCookie,
    // ]);

    return user;
  }
}
