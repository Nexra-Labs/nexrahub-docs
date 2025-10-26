import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
    collection: 'game_genres'
})
export class GameGenre extends Document {
    @Prop({
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    })
    genre: string;
}

export const GameGenreSchema = SchemaFactory.createForClass(GameGenre);

GameGenreSchema.virtual('id').get(function (this: GameGenre) {
    return (this._id as Types.ObjectId).toHexString();
});
GameGenreSchema.set('toJSON', { virtuals: true });
GameGenreSchema.set('toObject', { virtuals: true });
