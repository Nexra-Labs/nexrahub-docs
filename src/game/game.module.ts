import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameGenreController } from './game-genre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './schemas/game.schema';
import { GameGenre, GameGenreSchema } from './schemas/game-genre.schema';
import { GameService } from './providers/game.service';
import { GameGenreService } from './providers/game-genre.service';
import { GameRepository } from './repositories/game.repository';
import { GameGenreRepository } from './repositories/game-genre.repository';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    MongooseModule.forFeature([{ name: GameGenre.name, schema: GameGenreSchema }]),
    OtpModule
  ],
  providers: [GameService, GameGenreService, GameRepository, GameGenreRepository],
  controllers: [GameGenreController, GameController],
  exports: [GameService]
})
export class GameModule { }
