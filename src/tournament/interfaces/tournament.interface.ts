import { Types } from 'mongoose';
import { TournamentStatus } from '../enums/tournament-status.enum';

export interface ITournament {
    _id?: string | Types.ObjectId;
    id?: string | Types.ObjectId;
    game: string | Types.ObjectId;
    name: string;
    description?: string;
    entryFee?: number;
    prizePool?: number;
    totalPredictionAmount?: number;
    status?: TournamentStatus;
    startTime?: Date;
    endTime?: Date;
    winner?: string | Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}
