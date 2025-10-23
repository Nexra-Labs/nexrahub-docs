import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tournament } from 'src/tournament/schemas/tournament.schema';
import { Gamer } from 'src/gamer/schemas/gamer.schema';

@Schema({
    timestamps: true,
    versionKey: false,
    collection: 'bet_options'
})
export class BetOption extends Document {
    @Prop({
        type: Types.ObjectId,
        ref: Tournament.name,
        required: true,
        index: true
    })
    tournament: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: Gamer.name,
        required: true,
        index: true
    })
    gamer: Types.ObjectId;

    @Prop({
        type: Number,
        default: 0,
        min: 0
    })
    totalBetAmount: number;
}

export const BetOptionSchema = SchemaFactory.createForClass(BetOption);

BetOptionSchema.index({ tournament: 1, gamer: 1 }, { unique: true });
BetOptionSchema.virtual('odds').get(function (this: BetOption & { tournament?: any }) {
    try {
        const tournament = this.tournament;
        if (!tournament || typeof tournament.prizePool !== 'number' || tournament.prizePool <= 0) {
            return null;
        }
        return this.totalBetAmount / tournament.prizePool;
    } catch {
        return null;
    }
});
BetOptionSchema.virtual('id').get(function (this: BetOption) {
    return (this._id as Types.ObjectId).toHexString();
});
BetOptionSchema.set('toJSON', { virtuals: true });
BetOptionSchema.set('toObject', { virtuals: true });
