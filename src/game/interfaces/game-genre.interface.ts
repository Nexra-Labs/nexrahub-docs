import { Types } from "mongoose";

export interface IGameGenre {
    _id?: string | Types.ObjectId;
    id?: string | Types.ObjectId;
    genre: string;
    createdAt?: Date;
}
