import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './providers/auth.service';
import { RequestOtpDto } from './dtos/request-otp.dto';
import { VerifyOtpDto } from './dtos/verify-otp.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('request')
    @Auth(AuthType.None)
    @HttpCode(200)
    @ApiOperation({ summary: 'Request OTP for signup/signin' })
    @ApiResponse({
        status: 200,
        description: 'OTP sent successfully',
        example: {
            "message": "OTP sent successfully",
            "email": "chuksaginamada@gmail.com"
        }
    })
    async requestOtp(@Body() body: RequestOtpDto) {
        return this.authService.requestOtp(body.email);
    }

    @Post('verify')
    @Auth(AuthType.None)
    @HttpCode(200)
    @ApiOperation({ summary: 'Verify OTP to complete login/signup' })
    @ApiResponse({
        status: 200,
        description: 'OTP verified successfully',
        example: {
            "message": "Authentication successful",
            "user": {
                "_id": "68f8d5eb71ee81dd785a2f6f",
                "username": "frozen_moon_0",
                "email": "chuksaginamada@gmail.com",
                "role": "developer",
                "walletAddress": null,
                "balance": 0,
                "createdAt": "2025-10-22T13:02:35.951Z",
                "updatedAt": "2025-10-22T13:32:27.830Z",
                "id": "68f8d5eb71ee81dd785a2f6f"
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGY4ZDVlYjcxZWU4MWRkNzg1YTJmNmYiLCJpYXQiOjE3NjExOTkzNjUsImV4cCI6MTc2MTIwMjk2NX0.KeWvYv1vL-4ej4Ov4XvezpCEOnjFiAlSOINU6LpN8Dg"
        }
    })
    async verifyOtp(@Body() body: VerifyOtpDto) {
        return this.authService.verifyOtp(body.email, body.code);
    }
}
