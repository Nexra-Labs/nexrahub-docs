import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTournamentEntryDto {
    @IsString()
    @ApiProperty({
        description: 'Gamer ID',
        example: 'silent gamer',
        required: true
    })
    gamer: string;
}
