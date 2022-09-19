import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KakaoOauthModule } from './kakao-oauth/kakao-oauth.module';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService:ConfigService)=>({

      })}),
      KakaoOauthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
