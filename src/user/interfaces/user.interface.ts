import { Types } from "mongoose";
import { UserRole } from "../enums/user-role.enum";

export interface IUser {
    id?: string | Types.ObjectId;
    _id?: string | Types.ObjectId;
    username: string;
    email: string;
    role?: UserRole;
    walletAddress?: string;
    balance?: number;
    createdAt?: Date;
    updatedAt?: Date;
}