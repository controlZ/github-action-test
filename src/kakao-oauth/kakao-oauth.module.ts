import { Module } from '@nestjs/common';
import { KakaoOauthController } from './kakao-oauth.controller';
import { KakaoOauthRepository } from './kakao-oauth.repository';
import { KakaoOauthService } from './kakao-oauth.service';

@Module({
  controllers: [KakaoOauthController],
  providers: [KakaoOauthService, KakaoOauthRepository]
})
export class KakaoOauthModule {}
