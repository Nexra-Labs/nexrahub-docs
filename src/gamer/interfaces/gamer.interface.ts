import { Types } from 'mongoose';

export interface IGamer {
    _id?: string | Types.ObjectId;
    id?: string | Types.ObjectId;
    game: string | Types.ObjectId;
    gamerId: string;
    createdAt?: Date;
}
