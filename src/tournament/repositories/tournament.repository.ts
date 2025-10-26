import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/commonModule/base.repository';
import { Tournament } from '../schemas/tournament.schema';
import { ITournament } from '../interfaces/tournament.interface';

@Injectable()
export class TournamentRepository extends BaseRepository<ITournament> {
    constructor(@InjectModel(Tournament.name) private tournamentModel: Model<ITournament>) {
        super(tournamentModel);
    }
}
