import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Game } from 'src/game/schemas/game.schema';

@Schema({
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
    collection: 'gamers'
})
export class Gamer extends Document {
    @Prop({
        type: Types.ObjectId,
        ref: Game.name,
        required: true,
        index: true
    })
    game: Types.ObjectId;

    @Prop({
        required: true,
        trim: true
    })
    gamerId: string;
}

export const GamerSchema = SchemaFactory.createForClass(Gamer);

GamerSchema.index({ game: 1, gamerId: 1 }, { unique: true });
GamerSchema.virtual('id').get(function (this: Gamer) {
    return (this._id as Types.ObjectId).toHexString();
});
GamerSchema.set('toJSON', { virtuals: true });
GamerSchema.set('toObject', { virtuals: true });
