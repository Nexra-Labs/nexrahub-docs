import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
    collection: 'otps'
})
export class Otp extends Document {
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
        default: () => new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiry
        index: { expireAfterSeconds: 0 }, // TTL index (Mongo auto-delete)
    })
    expiresAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
OtpSchema.index({ email: 1, code: 1 });

OtpSchema.virtual('id').get(function (this: Otp) {
    return (this._id as Types.ObjectId).toHexString();
});
OtpSchema.set('toJSON', { virtuals: true });
OtpSchema.set('toObject', { virtuals: true });