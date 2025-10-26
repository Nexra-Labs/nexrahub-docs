import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '../enums/user-role.enum';

@Schema({
    timestamps: true,
    versionKey: false,
    collection: 'users'
})
export class User extends Document {
    @Prop({
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    })
    username: string;

    @Prop({
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true
    })
    email: string;

    @Prop({
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER,
        required: true
    })
    role: UserRole;

    @Prop({
        type: String,
        default: null,
        trim: true,
        sparse: true
    })
    walletAddress?: string;

    @Prop({
        type: Number,
        default: 0,
        min: 0
    })
    balance: number;
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
    return (this._id as Types.ObjectId).toHexString();
});

UserSchema.set('toJSON', { virtuals: true, });
UserSchema.set('toObject', { virtuals: true });