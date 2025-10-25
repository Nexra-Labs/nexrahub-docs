import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Game } from 'src/game/schemas/game.schema';
import { TournamentStatus } from '../enums/tournament-status.enum';
import { Gamer } from 'src/gamer/schemas/gamer.schema';

@Schema({
    timestamps: true,
    versionKey: false,
    collection: 'tournaments'
})
export class Tournament extends Document {
    @Prop({
        type: Types.ObjectId,
        ref: Game.name,
        required: true
    })
    game: Types.ObjectId;

    @Prop({
        required: true,
        unique: true,
        trim: true,
        type: String
    })
    name: string;

    @Prop({
        required: false,
        trim: true,
        type: String
    })
    description: string;

    @Prop({
        type: Number,
        default: 0,
        min: 0
    })
    entryFee: number;

    @Prop({
        type: Number,
        default: 0,
        min: 0
    })
    prizePool: number;

    @Prop({
        type: Number,
        default: 0,
        min: 0
    })
    totalPredictionAmount: number;

    @Prop({
        type: String,
        enum: Object.values(TournamentStatus),
        default: TournamentStatus.PENDING
    })
    status: TournamentStatus;

    @Prop({
        type: Date,
        required: false
    })
    startTime: Date;

    @Prop({
        type: Date,
        required: false
    })
    endTime: Date;

    @Prop({
        type: Types.ObjectId,
        ref: Gamer.name,
        default: null
    })
    winner?: Types.ObjectId;
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);

TournamentSchema.virtual('id').get(function (this: Tournament) {
    return (this._id as Types.ObjectId).toHexString();
});
TournamentSchema.set('toJSON', { virtuals: true });
TournamentSchema.set('toObject', { virtuals: true });
