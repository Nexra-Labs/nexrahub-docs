import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestOtpDto {
    @IsEmail()
    @ApiProperty({ example: 'chuksaginamada@gmail.com', description: 'User email' })
    email: string;
}
