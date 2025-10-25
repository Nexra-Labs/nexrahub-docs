import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, HydratedDocument } from 'mongoose';
import { CreatePredictionOptionDto } from 'src/bet/dtos/create-prediction-option.dto';
import { PredictionOption } from 'src/bet/schemas/prediction-option.schema';

@Injectable()
export class PredictionOptionService {
    constructor(
        @InjectModel(PredictionOption.name)
        private readonly betOptionModel: Model<HydratedDocument<PredictionOption>>,
    ) { }

    async createOption(
        createPredictionOptionDto: CreatePredictionOptionDto,
    ): Promise<HydratedDocument<PredictionOption>> {
        const { tournament, gamer } = createPredictionOptionDto;

        const existingOption = await this.betOptionModel.findOne({ tournament, gamer });
        if (existingOption) {
            throw new BadRequestException('Prediction option already exists for this gamer, gamer already entered the tournament.');
        }

        const newOption = new this.betOptionModel(createPredictionOptionDto);
        return await newOption.save();
    }
}
