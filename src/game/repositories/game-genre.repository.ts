import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/commonModule/base.repository';
import { IGameGenre } from '../interfaces/game-genre.interface';
import { GameGenre } from '../schemas/game-genre.schema';

@Injectable()
export class GameGenreRepository extends BaseRepository<IGameGenre> {
    constructor(@InjectModel(GameGenre.name) genreModel: Model<IGameGenre>) {
        super(genreModel);
    }
}
