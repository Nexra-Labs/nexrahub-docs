import { Schema, Document } from 'mongoose';
import { IOtp } from '../interfaces/otp.interface';

export const OtpSchema = new Schema<IOtp>({
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 5 * 60 * 1000) // 5 mins from creation
    }
}, {
    versionKey: false
});

export type OtpDocument = IOtp & Document;
// TTL index — Mongo auto deletes after expiry
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });