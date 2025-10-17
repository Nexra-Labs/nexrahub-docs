import { Module } from '@nestjs/common';
import { AppService } from './app/app.service';
import { AppController } from './app/app.controller';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { TournamentModule } from './tournament/tournament.module';
import { BetModule } from './bet/bet.module';
import { TransactionModule } from './transaction/transaction.module';
import { CommissionModule } from './commission/commission.module';

@Module({
  imports: [UserModule, GameModule, TournamentModule, BetModule, TransactionModule, CommissionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
