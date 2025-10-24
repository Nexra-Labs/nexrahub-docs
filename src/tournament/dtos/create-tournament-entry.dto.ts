import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreateTournamentEntryDto {
    @IsString()
    @ApiProperty({
        description: 'Gamer ID',
        example: 'silent gamer',
        required: true
    })
    gamer: string;
}
