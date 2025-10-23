import { Types } from 'mongoose';

export interface IGamer {
    id?: string;
    game: string | Types.ObjectId;
    gamerId: string;
    createdAt?: Date;
}
