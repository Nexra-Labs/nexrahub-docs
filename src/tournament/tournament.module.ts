import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentEntryController } from './tournament-entry.controller';

@Module({
  controllers: [TournamentController, TournamentEntryController]
})
export class TournamentModule {}
