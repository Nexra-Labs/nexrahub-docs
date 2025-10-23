import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/commonModule/base.repository';
import { IGamer } from '../interfaces/gamer.interface';
import { Gamer } from '../schemas/gamer.schema';

@Injectable()
export class GamerRepository extends BaseRepository<IGamer> {
    constructor(@InjectModel(Gamer.name) private readonly gamerModel: Model<IGamer>) {
        super(gamerModel);
    }
}
