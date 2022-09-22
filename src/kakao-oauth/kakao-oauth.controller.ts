import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { KakaoOauthService } from './kakao-oauth.service';

@Controller('kakao-oauth')
export class KakaoOauthController {
  constructor(
    private readonly kakaoOuthService: KakaoOauthService,
  ) {}

  @Get('')
  async requestKakaologin(@Res() res: Response): Promise<void> {
    this.kakaoOuthService.requestKakaoLogin(res);
  }

  @Get('returnToken')
  async getAuthorizationToken(@Query('code') code: string): Promise<void> {
    return this.kakaoOuthService.getAuthorizationToken(code);
  }
}
