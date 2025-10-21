import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { OtpService } from './providers/otp.service';
import {
    ApiTags,
    ApiOperation,
    ApiResponse
} from '@nestjs/swagger';
import { CreateOtpDto } from './dtos/create-otp.dto';

@ApiTags('OTP')
@Controller('otp')
export class OtpController {

    constructor(private readonly otpService: OtpService) { }

    @Post('send')
    @HttpCode(200)
    @ApiOperation({ summary: 'Send an OTP to an email' })
    @ApiResponse({
        status: 200,
        description: 'OTP sent successfully.',
        schema: {
            example: { message: 'OTP sent successfully', email: 'user@example.com' },
        }
    })
    async sendOtp(@Body() body: CreateOtpDto) {
        const result = await this.otpService.sendOtp(body.email);
        return { message: 'OTP sent successfully', email: result.email };
    }
}
