import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OtpService } from './providers/otp.service';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiSecurity
} from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';

@ApiTags('OTP')
@ApiSecurity('jwt-auth')
@Controller('otp')
export class OtpController {

    constructor(private readonly otpService: OtpService) { }

    @Post('send')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Send an OTP to an email' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'OTP sent successfully.',
        schema: {
            example: {
                message: 'OTP sent successfully',
                email: 'user@example.com'
            }
        }
    })
    async sendOtp(@ActiveUser() user: IUser) {
        const result = await this.otpService.sendOtp(user.email);
        return { message: 'OTP sent successfully', email: result.email };
    }
}
