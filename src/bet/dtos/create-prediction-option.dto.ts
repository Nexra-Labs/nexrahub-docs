import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePredictionOptionDto {
    @IsMongoId()
    @ApiProperty({ description: 'Tournament ID', example: '60d21b4667d0d8992e610c85' })
    tournament: string | Types.ObjectId;

    @IsMongoId()
    @ApiProperty({ description: 'Gamer ID', example: '60d21b4967d0d8992e610c86' })
    gamer: string | Types.ObjectId;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ description: 'Total bet amount', example: 1000 })
    totalPredictionAmount?: number;
}
