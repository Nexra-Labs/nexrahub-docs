import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/commonModule/base.repository';
import { IPredictionOption } from '../interfaces/prediction-option.interface';
import { PredictionOption } from '../schemas/prediction-option.schema';

@Injectable()
export class PredictionOptionRepository extends BaseRepository<IPredictionOption> {
    constructor(@InjectModel(PredictionOption.name) predictionOptionModel: Model<IPredictionOption>) {
        super(predictionOptionModel);
    }
}
