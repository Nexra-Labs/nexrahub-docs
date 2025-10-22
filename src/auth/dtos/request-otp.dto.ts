import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RequestOtpDto {
    @IsEmail()
    @ApiProperty({ example: 'chuksaginamada@gmail.com', description: 'User email' })
    email: string;
}
