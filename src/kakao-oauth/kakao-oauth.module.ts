import { Module } from '@nestjs/common';
import { KakaoOauthController } from './kakao-oauth.controller';
import { KakaoOauthService } from './kakao-oauth.service';

@Module({
  controllers: [KakaoOauthController],
  providers: [KakaoOauthService]
})
export class KakaoOauthModule {}
