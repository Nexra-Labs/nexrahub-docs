import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Tournament } from 'src/tournament/schemas/tournament.schema';
import { Gamer } from 'src/gamer/schemas/gamer.schema';

@Schema({
    timestamps: true,
    versionKey: false,
    collection: 'tournament_entries',
})
export class TournamentEntry extends Document {
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
        default: 0
    })
    entryFee: number;

    @Prop({
        type: Date,
        required: true,
        default: () => new Date()
    })
    joinedAt: Date;

    @Prop({
        type: Boolean,
        default: false
    })
    eliminated: boolean;

    @Prop({
        type: Date,
        default: null
    })
    eliminatedAt?: Date;

    @Prop({
        type: Number,
        default: null
    })
    rank?: number;
}

export const TournamentEntrySchema = SchemaFactory.createForClass(TournamentEntry);

TournamentEntrySchema.virtual('id').get(function (this: TournamentEntry) {
    return (this._id as Types.ObjectId).toHexString();
});
TournamentEntrySchema.set('toJSON', { virtuals: true });
TournamentEntrySchema.set('toObject', { virtuals: true });
