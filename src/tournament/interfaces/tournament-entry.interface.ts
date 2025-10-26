import { Types } from 'mongoose';

export interface ITournamentEntry {
    _id?: string | Types.ObjectId;
    id?: string | Types.ObjectId;
    tournament: Types.ObjectId;
    gamer: Types.ObjectId;
    entryFee?: number;
    joinedAt?: Date;
    eliminated?: boolean;
    eliminatedAt?: Date | null;
    rank?: number | null;
}
