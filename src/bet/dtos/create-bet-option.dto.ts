import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class CreateBetOptionDto {
    @IsMongoId()
    @ApiProperty({ description: 'Tournament ID', example: '60d21b4667d0d8992e610c85' })
    tournament: string;

    @IsMongoId()
    @ApiProperty({ description: 'Gamer ID', example: '60d21b4967d0d8992e610c86' })
    gamer: string;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: 'Total bet amount', example: 1000 })
    totalBetAmount?: number;
}
