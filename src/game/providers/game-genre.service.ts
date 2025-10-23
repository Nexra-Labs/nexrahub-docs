import { Injectable, BadRequestException } from '@nestjs/common';
import { GameGenreRepository } from '../repositories/game-genre.repository';
import { CreateGenreDto } from '../dtos/create-genre.dto';
import { Types } from 'mongoose';

@Injectable()
export class GameGenreService {
    constructor(private readonly genreRepo: GameGenreRepository) { }

    async createGenre(dto: CreateGenreDto) {
        const exists = await this.genreRepo.findOne({ genre: dto.genre });
        if (exists) throw new BadRequestException('Genre already exists');
        return this.genreRepo.create(dto);
    }

    async fetchAllGenres() {
        return this.genreRepo.findAll({}, "-createdAt", { sort: { genre: 1 } });
    }

    async validateGenres(genreIds: Types.ObjectId[]) {
        const objectIds = genreIds.map(id => id);
        const genres = await this.genreRepo.findAll({ _id: { $in: objectIds } });
        return genres.map(genre => genre._id as Types.ObjectId);
    }
}
