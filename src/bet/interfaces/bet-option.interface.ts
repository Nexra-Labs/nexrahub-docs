import { Types } from 'mongoose';

export interface IBetOption {
    _id?: string | Types.ObjectId;
    id?: string | Types.ObjectId;
    tournament: Types.ObjectId;
    gamer: Types.ObjectId;
    totalBetAmount: number;
    createdAt?: Date;
    updatedAt?: Date;
    odds?: number;
}
