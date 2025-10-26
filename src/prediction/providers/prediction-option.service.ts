import { Injectable, BadRequestException } from '@nestjs/common';
import { PopulateOptions, ProjectionType, QueryOptions, Types } from 'mongoose';
import { CreatePredictionOptionDto } from 'src/prediction/dtos/create-prediction-option.dto';
import { PredictionOptionRepository } from '../repositories/prediction-option.repository';
import { IPredictionOption } from '../interfaces/prediction-option.interface';

@Injectable()
export class PredictionOptionService {
    constructor(
        private readonly predictionOptionRepo: PredictionOptionRepository,
    ) { }

    async createOption(
        createPredictionOptionDto: CreatePredictionOptionDto,
    ) {
        const { tournament, gamer, totalPredictionAmount } = createPredictionOptionDto;

        const existingOption = await this.predictionOptionRepo.findOne({ tournament, gamer });
        if (existingOption) {
            throw new BadRequestException('Prediction option already exists for this gamer, gamer already entered the tournament.');
        }

        return await this.predictionOptionRepo.create({
            tournament: new Types.ObjectId(tournament),
            gamer: new Types.ObjectId(gamer),
            totalPredictionAmount
        });
    }

    async incrementTotalAmount(optionId: string | Types.ObjectId, amount: number): Promise<void> {
        await this.predictionOptionRepo.updateById(
            optionId,
            { $inc: { totalPredictionAmount: amount } }
        );
    }

    async findById(
        id: string | Types.ObjectId,
        projection?: ProjectionType<IPredictionOption>,
        options?: QueryOptions<IPredictionOption>,
        populate?: PopulateOptions | (string | PopulateOptions)[]
    ) {
        return await this.predictionOptionRepo.findById(id, projection, options, populate);
    }
}
