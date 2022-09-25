import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { Response } from 'express';
import { KakaoOauthRepository } from './kakao-oauth.repository';

@Injectable()
export class KakaoOauthService {
  constructor(
    private readonly kakaoOauthRepository: KakaoOauthRepository,
    private readonly configservice: ConfigService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}
  async requestKakaoLogin(res: Response): Promise<void> {
    //카카오 로그인 요청을 받으면, 인가코드를 요청한다.
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${this.configservice.get<string>(
      'REST_API_KEY',
    )}&redirect_uri=${this.configservice.get<string>('REDIRECT_URI')}`;
    res.redirect(url);
  }

  async getAuthorizationToken(code: string): Promise<string> {
    //URI로 인가코드가 들어오면 접근 토큰을 받은후 사용자의 정보를 얻은 후 frontend에 서비스 토큰을 준다.
    console.log('getAuthorizationToken');
    const AccessToken = await this.getToken(code);
    const userData = await this.extractinformation(AccessToken);
    await this.checkUser(userData);
    console.log(await this.checkUser(userData));
    return '';
  }

  async getToken(code: string): Promise<string> {
    //인가 코드 받고 oauth 토큰을 받는다.
    const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${this.configservice.get<string>(
      'REST_API_KEY',
    )}&redirect_uri=${this.configservice.get<string>(
      'REDIRECT_URI',
    )}&code=${code}`;
    const TokenJSON = await axios.post(url, '', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    console.log(TokenJSON.data);
    return TokenJSON.data.access_token;
  }

  async extractinformation(token: string) {
    //oauth 토큰으로 사용자 정보를 받는다.
    const url = `https://kapi.kakao.com/v2/user/me`;
    const TokenData = await axios.post(url, '', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    console.log(TokenData.data);
    return TokenData.data;
  }

  async checkUser(userdata): Promise<string> {
    //사용자가 존재하는 사용자인지 확인(없으면 회원가입)
    const user = await this.kakaoOauthRepository.findOneById(userdata.id);
    if (user === null) {
      await this.saveUserInfo(userdata);
    } else return this.login(userdata);
  }

  async saveUserInfo(userdata): Promise<void> {
    //Kakao-User정보 DB에 저장
    await this.kakaoOauthRepository.createUser(userdata);
  }

  async login(userdata): Promise<string> {
    //jwt토큰을 준다.
    const payload = {
      username: userdata.properties.nickname,
      sub: userdata.id,
    };
    const ServerAccessToken = this.jwtService.sign(payload, {
      secret: this.configservice.get<string>('JWT_SECRET'),
      expiresIn: this.configservice.get<string>('JWT_EXPIERSIN'),
    });

    return ServerAccessToken;
  }
}
