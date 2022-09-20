import { Module } from '@nestjs/common';
import { CheckLoginController } from './check-login.controller';
import { CheckLoginService } from './check-login.service';

@Module({
  controllers: [CheckLoginController],
  providers: [CheckLoginService]
})
export class CheckLoginModule {}
