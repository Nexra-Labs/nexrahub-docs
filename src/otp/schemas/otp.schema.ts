import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    versionKey: false,
    collection: 'otps'
})
export class Otp {
    @Prop({
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        trim: true,
        length: 6
    })
    code: string;

    @Prop({
        type: Date,
        default: Date.now,
        immutable: true,
    })
    createdAt: Date;

    @Prop({
        type: Date,
        default: () => new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiry
        index: { expireAfterSeconds: 0 }, // TTL index (Mongo auto-delete)
    })
    expiresAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
OtpSchema.index({ email: 1, code: 1 });