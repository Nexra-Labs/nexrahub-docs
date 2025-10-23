import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/commonModule/base.repository';
import { IGame } from '../interfaces/game.interface';
import { Game } from '../schemas/game.schema';

@Injectable()
export class GameRepository extends BaseRepository<IGame> {
    constructor(@InjectModel(Game.name) gameModel: Model<IGame>) {
        super(gameModel);
    }
}
