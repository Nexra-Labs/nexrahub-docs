import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { PredictionOptionService } from 'src/prediction/providers/prediction-option.service';
import { GamerService } from 'src/gamer/providers/gamer.service';
import { TournamentService } from './tournament.service';
import { CreateTournamentEntryDto } from '../dtos/create-tournament-entry.dto';
import { TournamentStatus } from '../enums/tournament-status.enum';
import { TournamentEntryRepository } from '../repositories/tournament-entry.repository';

@Injectable()
export class TournamentEntryService {
    constructor(
        private readonly tournamentEntryRepo: TournamentEntryRepository,
        private readonly gamerService: GamerService,
        private readonly tournamentService: TournamentService,
        private readonly predictionOptionService: PredictionOptionService,
    ) { }

    async enterTournament(tournament: string | Types.ObjectId, dto: CreateTournamentEntryDto) {
        const { gamer } = dto;

        const tournamentDoc = await this.tournamentService.findById(tournament);
        if (!tournamentDoc) throw new NotFoundException('Tournament not found');
        if (tournamentDoc.status !== TournamentStatus.PUBLISHED) throw new BadRequestException('Tournament is not open for entry');
        if (new Date(tournamentDoc.startTime) <= new Date()) throw new BadRequestException('Tournament has already started');

        let gamerDoc = await this.gamerService.findOne({ gamerId: gamer, game: tournamentDoc.game });
        if (!gamerDoc) {
            gamerDoc = await this.gamerService.registerGamer(tournamentDoc.game, gamer);
        }

        const existingEntry = await this.tournamentEntryRepo.findOne({
            tournament,
            gamer: gamerDoc._id,
        });
        if (existingEntry) throw new BadRequestException('Gamer already entered this tournament');

        await Promise.all([
            this.tournamentEntryRepo.create({
                tournament: new Types.ObjectId(tournament),
                gamer: new Types.ObjectId(gamerDoc._id),
                entryFee: tournamentDoc.entryFee
            }),
            this.predictionOptionService.createOption({
                tournament,
                gamer: gamerDoc._id.toString(),
            }),
            this.tournamentService.increamentPrizePool(tournamentDoc._id.toString(), tournamentDoc.entryFee)
        ]);

        return await this.tournamentService.findById(tournamentDoc._id, "", {}, { path: 'game', select: 'name' });
    }
}
