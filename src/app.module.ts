import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KakaoOauthModule } from './kakao-oauth/kakao-oauth.module';
import { CheckLoginModule } from './check-login/check-login.module';
import { MySqlConfigModule } from './config/database/config.module';
import { MySqlConfigService } from './config/database/config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useClass: MySqlConfigService,
      inject: [MySqlConfigService],
    }),
    KakaoOauthModule,
    CheckLoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
