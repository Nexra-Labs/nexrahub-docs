import { forwardRef, Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tournament, TournamentSchema } from './schemas/tournament.schema';
import { TournamentService } from './providers/tournament.service';
import { TournamentRepository } from './repositories/tournament.repository';
import { GamerModule } from 'src/gamer/gamer.module';
import { GameModule } from 'src/game/game.module';
import { TournamentEntry, TournamentEntrySchema } from './schemas/tournament-entry.schema';
import { TournamentEntryService } from './providers/tournament-entry.service';
import { TournamentEntryRepository } from './repositories/tournament-entry.repository';
import { PredictionModule } from 'src/prediction/prediction.module';

@Module({
  controllers: [TournamentController],
  imports: [
    MongooseModule.forFeature([{ name: Tournament.name, schema: TournamentSchema }]),
    MongooseModule.forFeature([{ name: TournamentEntry.name, schema: TournamentEntrySchema }]),
    GamerModule,
    GameModule,
    forwardRef(() => PredictionModule)
  ],
  providers: [TournamentService, TournamentRepository, TournamentEntryService, TournamentEntryRepository],
  exports: [TournamentService]
})
export class TournamentModule { }
