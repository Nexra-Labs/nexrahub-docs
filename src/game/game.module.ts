import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameGenreController } from './game-genre.controller';

@Module({
  controllers: [GameController, GameGenreController]
})
export class GameModule {}
