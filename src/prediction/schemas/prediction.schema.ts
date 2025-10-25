import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PredictionStatus } from '../enums/prediction-status.enum';
import { User } from 'src/user/schemas/user.schema';
import { PredictionOption } from './prediction-option.schema';

@Schema({
    timestamps: true,
    versionKey: false,
    collection: 'predictions'
})
export class Prediction extends Document {
    @Prop({
        type: Types.ObjectId,
        ref: User.name,
        required: true
    })
    bettor: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: PredictionOption.name,
        required: true
    })
    predictionOption: Types.ObjectId;

    @Prop({
        type: Number,
        required: true,
        min: 1
    })
    amount: number;

    @Prop({
        type: Number,
        required: true
    })
    oddsAtPlacement: number;

    @Prop({
        type: String,
        enum: Object.values(PredictionStatus),
        default: PredictionStatus.PENDING,
    })
    status: PredictionStatus;
}

export const PredictionSchema = SchemaFactory.createForClass(Prediction);

PredictionSchema.virtual('id').get(function (this: any) {
    return (this._id as Types.ObjectId).toHexString();
});
PredictionSchema.virtual('potentialPayout').get(function (this: any) {
    const option = this.predictionOption as any;
    return option && typeof option === 'object' && option.odds ? this.amount * option.odds : null;
});
PredictionSchema.set('toJSON', { virtuals: true });
PredictionSchema.set('toObject', { virtuals: true });
PredictionSchema.index({ bettor: 1, predictionOption: 1 });
