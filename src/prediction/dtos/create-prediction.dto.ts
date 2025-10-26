import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePredictionDto {
    @ApiProperty({
        example: '6718b9f9e72b3b298a1fc025',
        description: 'Prediction option ID',
        required: true,
        type: String
    })
    @IsMongoId()
    @IsNotEmpty()
    predictionOption: Types.ObjectId | string;

    @ApiProperty({
        example: 150,
        description: 'Amount to bet (minimum 1)',
        required: true,
        type: Number
    })
    @IsNumber()
    @Min(1)
    amount: number;
}
