import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, HydratedDocument } from 'mongoose';
import { BetOption } from '../schemas/bet-option.schema';
import { CreateBetOptionDto } from '../dtos/create-bet-option.dto';

@Injectable()
export class BetOptionService {
    constructor(
        @InjectModel(BetOption.name)
        private readonly betOptionModel: Model<HydratedDocument<BetOption>>,
    ) { }

    async createOption(
        createBetOptionDto: CreateBetOptionDto,
    ): Promise<HydratedDocument<BetOption>> {
        const { tournament, gamer } = createBetOptionDto;

        const existingOption = await this.betOptionModel.findOne({ tournament, gamer });
        if (existingOption) {
            throw new BadRequestException('Bet option already exists for this gamer, gamer already entered the tournament.');
        }

        const newOption = new this.betOptionModel(createBetOptionDto);
        return await newOption.save();
    }
}
