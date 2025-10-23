import { Types } from 'mongoose';
import { IGameGenre } from './game-genre.interface';
import { IUser } from 'src/user/interfaces/user.interface';

export interface IGame {
    _id?: string | Types.ObjectId;
    id?: string | Types.ObjectId;
    name: string;
    slug: string;
    banner: string;
    description: string;
    website: string;
    genre: IGameGenre[] | string[] | Types.ObjectId[];
    tags?: string[];
    developer: IUser | string | Types.ObjectId;
    apiKey: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
