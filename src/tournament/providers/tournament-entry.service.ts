import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, HydratedDocument, Types } from 'mongoose';
import { TournamentEntry } from '../schemas/tournament-entry.schema';
import { PredictionOptionService } from 'src/prediction/providers/prediction/prediction-option.service';
import { GamerService } from 'src/gamer/providers/gamer.service';
import { TournamentService } from './tournament.service';
import { CreateTournamentEntryDto } from '../dtos/create-tournament-entry.dto';
import { TournamentStatus } from '../enums/tournament-status.enum';

@Injectable()
export class TournamentEntryService {
    constructor(
        @InjectModel(TournamentEntry.name)
        private readonly tournamentEntryModel: Model<HydratedDocument<TournamentEntry>>,
        private readonly gamerService: GamerService,
        private readonly tournamentService: TournamentService,
        private readonly betOptionService: PredictionOptionService,
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

        const existingEntry = await this.tournamentEntryModel.findOne({
            tournament,
            gamer: gamerDoc._id,
        });
        if (existingEntry) throw new BadRequestException('Gamer already entered this tournament');

        const newEntry = new this.tournamentEntryModel({
            tournament,
            gamer: gamerDoc._id,
            entryFee: tournamentDoc.entryFee
        });
        await Promise.all([
            newEntry.save(),
            this.betOptionService.createOption({
                tournament,
                gamer: gamerDoc._id.toString(),
            }),
            this.tournamentService.increamentPrizePool(tournamentDoc._id.toString(), tournamentDoc.entryFee)
        ]);

        return await this.tournamentService.findById(tournamentDoc._id, "", {}, { path: 'game', select: 'name' });
    }
}
