import { Types } from 'mongoose';

export interface JwtPayload {
    sub: string | Types.ObjectId;
}