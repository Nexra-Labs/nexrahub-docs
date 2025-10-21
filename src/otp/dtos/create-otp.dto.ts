import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateOtpDto {
    @IsEmail()
    @ApiProperty({
        description: 'Email address to send the OTP to',
        example: '4C4o7@example.com',
        required: true
    })
    email: string;
}