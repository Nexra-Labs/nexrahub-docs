import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class RequestOtpDto {
    @IsEmail()
    @ApiProperty({ example: 'user@example.com', description: 'User email' })
    email: string;
}
