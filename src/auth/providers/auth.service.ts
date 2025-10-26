import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OtpService } from 'src/otp/providers/otp.service';
import { JwtService } from 'src/security/providers/jwt.service';
import { UserService } from 'src/user/providers/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly otpService: OtpService,
        private readonly jwtService: JwtService
    ) { }

    async requestOtp(email: string) {
        await this.otpService.sendOtp(email);
        return { message: 'OTP sent successfully', email };
    }

    async verifyOtp(email: string, code: string) {
        const valid = await this.otpService.verifyOtp(email, code);
        if (!valid) throw new UnauthorizedException('Invalid or expired OTP');

        let user = await this.userService.findByEmail(email);
        if (!user) {
            user = await this.userService.createUser(email);
        }

        const token = this.jwtService.sign({ sub: user._id });
        return { message: 'Authentication successful', user, token };
    }
}
