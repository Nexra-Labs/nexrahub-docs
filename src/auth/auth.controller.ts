import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './providers/auth.service';
import { RequestOtpDto } from './dtos/request-otp.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('request')
    @HttpCode(200)
    @ApiOperation({ summary: 'Request OTP for signup/signin' })
    @ApiResponse({ status: 200, description: 'OTP sent successfully' })
    async requestOtp(@Body() body: RequestOtpDto) {
        return this.authService.requestOtp(body.email);
    }

    @Post('verify')
    @HttpCode(200)
    @ApiOperation({ summary: 'Verify OTP to complete login/signup' })
    @ApiResponse({ status: 200, description: 'OTP verified successfully' })
    async verifyOtp(@Body() body: VerifyOtpDto) {
        return this.authService.verifyOtp(body.email, body.code);
    }
}
