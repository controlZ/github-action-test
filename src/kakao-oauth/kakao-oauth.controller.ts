import { Controller, Post } from '@nestjs/common';
import { KakaoOauthService } from './kakao-oauth.service';

@Controller('kakao-oauth')
export class KakaoOauthController {
  constructor(private readonly kakaoOuthService: KakaoOauthService) {}

  @Post('')
  async requestKakaologin(): Promise<void> {}
}
