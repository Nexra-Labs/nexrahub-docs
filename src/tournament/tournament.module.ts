import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentEntryController } from './tournament-entry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tournament, TournamentSchema } from './schemas/tournament.schema';
import { TournamentService } from './providers/tournament.service';
import { TournamentRepository } from './repositories/tournament.repository';
import { GamerModule } from 'src/gamer/gamer.module';
import { GameModule } from 'src/game/game.module';

@Module({
  controllers: [TournamentController, TournamentEntryController],
  imports: [MongooseModule.forFeature([{ name: Tournament.name, schema: TournamentSchema }]), GamerModule, GameModule],
  providers: [TournamentService, TournamentRepository]
})
export class TournamentModule {}
