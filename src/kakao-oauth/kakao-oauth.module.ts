import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { KakaoOauthController } from './kakao-oauth.controller';
import { KakaoOauthRepository } from './kakao-oauth.repository';
import { KakaoOauthService } from './kakao-oauth.service';

@Module({
  imports: [ConfigModule, HttpModule,JwtModule],
  controllers: [KakaoOauthController],
  providers: [KakaoOauthService, KakaoOauthRepository]
})
export class KakaoOauthModule {}
