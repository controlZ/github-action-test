import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entity/user.entity';
import { KakaoOauthModule } from './kakao-oauth/kakao-oauth.module';
import { CheckLoginModule } from './check-login/check-login.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: 'localhost',
        port: configService.get<number>('DATABASE_PORT'),
        username: 'KakaoBe',
        password: 'kakaoBeAdmin',
        database: 'kakaoBeDatabase',
        entities: [User],
      }),
    }),
    KakaoOauthModule,
    CheckLoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
