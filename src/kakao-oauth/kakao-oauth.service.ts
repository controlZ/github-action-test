import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { KakaoOauthRepository } from './kakao-oauth.repository';

@Injectable()
export class KakaoOauthService {
  constructor(
    private readonly kakaoOauthRepository: KakaoOauthRepository,
    private readonly configservice: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  async requestKakaoLogin(res: Response): Promise<void> {
    //카카오 로그인 요청을 받으면, 인가코드를 요청한다.
    const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${this.configservice.get<string>('REST_API_KEY')}&redirect_uri=${this.configservice.get<string>('REDIRECT_URI')}`;
    res.redirect(url);
  }

  async getAuthorizationToken(code: string): Promise<void> {
    //URI로 인가코드가 들어오면 접근 토큰을 받은후 사용자의 정보를 얻은 후 front end에 서비스 토큰을 준다.
    const AcceseToken = this.getToken(code);
    this.extractinformation();
  }

  async getToken(code: string): Promise<string> {
    //인가 코드 받고 oauth 토큰을 받는다.
    const Token = this.httpService.post(`https://kauth.kakao.com/oauth/token`,{data:{
        grant_type: 'authorization_code',
        client_id: this.configservice.get<string>('REST_API_KEY'),
        code: code,
    }});
    return ''
  }

  async extractinformation() {
    //oauth 토큰으로 사용자 정보를 받는다.
  }

  async checkUser() {
    //사용자가 존재하는 사용자인지 확인(없으면 회원가입)
  }

  async signUp() {
    //회원가입
  }

  async login() {
    //jwt토큰을 준다.
  }
}
