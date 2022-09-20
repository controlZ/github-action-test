import { Controller, Get } from '@nestjs/common';
import { CheckLoginService } from './check-login.service';

@Controller('check-login')
export class CheckLoginController {
  constructor(private readonly checkLoginService: CheckLoginService) {}

  @Get()
  async checkLogin(): Promise<void> {}
}
