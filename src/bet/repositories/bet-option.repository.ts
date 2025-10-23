import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/commonModule/base.repository';
import { IBetOption } from '../interfaces/bet-option.interface';
import { BetOption } from '../schemas/bet-option.schema';

@Injectable()
export class BetOptionRepository extends BaseRepository<IBetOption> {
    constructor(@InjectModel(BetOption.name) betOptionModel: Model<IBetOption>) {
        super(betOptionModel);
    }
}
