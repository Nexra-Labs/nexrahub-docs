import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tournament } from 'src/tournament/schemas/tournament.schema';
import { Gamer } from 'src/gamer/schemas/gamer.schema';

@Schema({
    timestamps: true,
    versionKey: false,
    collection: 'prediction_options'
})
export class PredictionOption extends Document {
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
    totalPredictionAmount: number;
}

export const PredictionOptionSchema = SchemaFactory.createForClass(PredictionOption);

PredictionOptionSchema.index({ tournament: 1, gamer: 1 }, { unique: true });
PredictionOptionSchema.virtual('odds').get(function (this: PredictionOption & { tournament?: any }) {
    try {
        const tournament = this.tournament;
        if (!tournament || typeof tournament.totalPredictionAmount !== 'number' || tournament.totalPredictionAmount < 0) {
            return null;
        }
        const prizePool = tournament.totalPredictionAmount === 0 ? 1 : tournament.totalPredictionAmount;
        const odds = prizePool / (this.totalPredictionAmount === 0 ? 1 : this.totalPredictionAmount);
        return parseFloat(odds.toFixed(2));
    } catch {
        return null;
    }
});
PredictionOptionSchema.virtual('id').get(function (this: PredictionOption) {
    return (this._id as Types.ObjectId).toHexString();
});
PredictionOptionSchema.set('toJSON', { virtuals: true });
PredictionOptionSchema.set('toObject', { virtuals: true });
