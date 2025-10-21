export interface IOtp {
    _id?: string;
    email: string;
    code: string;
    createdAt: Date;
    expiresAt: Date;
}