import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UserModule } from 'src/user/user.module';
import { OtpModule } from 'src/otp/otp.module';
import { SecurityModule } from 'src/security/security.module';

@Module({
  imports: [UserModule, OtpModule, SecurityModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
