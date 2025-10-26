import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyOtpDto {
    @IsEmail()
    @ApiProperty({ example: 'chuksaginamada@gmail.com', description: 'User email' })
    email: string;

    @IsString()
    @Length(6, 6)
    @ApiProperty({ example: '123456', description: 'OTP code' })
    code: string;
}
