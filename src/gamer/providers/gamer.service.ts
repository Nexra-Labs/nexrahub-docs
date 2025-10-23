import { BadRequestException, Injectable } from '@nestjs/common';
import { GamerRepository } from '../repositories/gamer.repository';
import { IGamer } from '../interfaces/gamer.interface';
import { Types } from 'mongoose';

@Injectable()
export class GamerService {
    constructor(private readonly gamerRepo: GamerRepository) {}

    async registerGamer(game: string | Types.ObjectId, gamerId: string): Promise<IGamer> {
        const exists = await this.gamerRepo.findOne({ game, gamerId });
        if (exists) {
            throw new BadRequestException('Gamer already registered for this game');
        }

        return this.gamerRepo.create({ game, gamerId });
    }
}
