import { Types } from 'mongoose';
import { PredictionStatus } from '../enums/prediction-status.enum';

export interface IPrediction {
    _id?: string | Types.ObjectId;
    id?: string | Types.ObjectId;
    bettor: Types.ObjectId | string;
    predictionOption: Types.ObjectId | string;
    amount: number;
    oddsAtPlacement: number;
    status?: PredictionStatus;
    createdAt?: Date;
    updatedAt?: Date;
    potentialPayout?: number;
}
