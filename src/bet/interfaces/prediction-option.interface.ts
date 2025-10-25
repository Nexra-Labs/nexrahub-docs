import { Types } from 'mongoose';

export interface IPredictionOption {
    _id?: string | Types.ObjectId;
    id?: string | Types.ObjectId;
    tournament: Types.ObjectId;
    gamer: Types.ObjectId;
    totalPredictionAmount: number;
    createdAt?: Date;
    updatedAt?: Date;
    odds?: number;
}
