import { PartialType } from '@nestjs/swagger';
import { CreateTournamentDto } from './create-tournament.dto';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateTournamentDto extends PartialType(CreateTournamentDto) {
    @IsOptional()
    @IsNumber()
    prizePool?: number;
}
