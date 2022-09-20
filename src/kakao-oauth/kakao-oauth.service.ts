import { Injectable } from '@nestjs/common';
import { KakaoOauthRepository } from './kakao-oauth.repository';

@Injectable()
export class KakaoOauthService {
    constructor(private readonly kakaoOauthRepository: KakaoOauthRepository){}
    async requestKakaoLogin(): Promise<void> {
        //카카오 로그인 요청을 받으면, 인가코드를 요청한다.
    }

    async getAuthorizationToken(): Promise<void> {
        //URI로 인가코드가 들어오면 접근 토큰을 받은후 사용자의 정보를 얻은 후 front end에 서비스 토큰을 준다.
        this.getToken();
        this.extractinformation();
    }

    async getToken(){
        //인가 코드 받고 oauth 토큰을 받는다.
    }

    async extractinformation(){
        //oauth 토큰으로 사용자 정보를 받는다.
    }

    async checkUser(){
        //사용자가 존재하는 사용자인지 확인(없으면 회원가입)
    }

    async signUp(){
        //회원가입
    }
    
    async login(){
        //jwt토큰을 준다.
    }
}
