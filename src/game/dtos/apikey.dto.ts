import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ApikeyDto {
    @IsString()
    @Length(6, 6)
    @ApiProperty({
        example: '123456',
        description: 'OTP code',
        required: true
    })
    code: string;
}
