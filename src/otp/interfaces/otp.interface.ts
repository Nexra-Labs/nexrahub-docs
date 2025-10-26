export interface IOtp {
    _id?: string;
    id?: string;
    email: string;
    code: string;
    createdAt: Date;
    expiresAt: Date;
}