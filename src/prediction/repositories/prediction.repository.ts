import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/commonModule/base.repository';
import { IPrediction } from '../interfaces/prediction.interface';
import { Prediction } from '../schemas/prediction.schema';

@Injectable()
export class PredictionRepository extends BaseRepository<IPrediction> {
    constructor(@InjectModel(Prediction.name) predictionModel: Model<IPrediction>) {
        super(predictionModel);
    }
}
