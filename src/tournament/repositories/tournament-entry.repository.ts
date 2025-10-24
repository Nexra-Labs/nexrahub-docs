import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/commonModule/base.repository';
import { TournamentEntry } from '../schemas/tournament-entry.schema';
import { ITournamentEntry } from '../interfaces/tournament-entry.interface';

@Injectable()
export class TournamentEntryRepository extends BaseRepository<ITournamentEntry> {
    constructor(@InjectModel(TournamentEntry.name) private tournamentEntryModel: Model<ITournamentEntry>) {
        super(tournamentEntryModel);
    }
}
