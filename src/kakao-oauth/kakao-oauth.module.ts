import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KakaoOauthController } from './kakao-oauth.controller';
import { KakaoOauthRepository } from './kakao-oauth.repository';
import { KakaoOauthService } from './kakao-oauth.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [KakaoOauthController],
  providers: [KakaoOauthService, KakaoOauthRepository]
})
export class KakaoOauthModule {}
