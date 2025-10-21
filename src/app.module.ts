import { Module } from '@nestjs/common';
import { AppService } from './app/app.service';
import { AppController } from './app/app.controller';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { TournamentModule } from './tournament/tournament.module';
import { BetModule } from './bet/bet.module';
import { TransactionModule } from './transaction/transaction.module';
import { CommissionModule } from './commission/commission.module';
import { AuthModule } from './auth/auth.module';
import { GamerModule } from './gamer/gamer.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import environmentValidation from './config/environment.validation';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UserModule,
    GameModule,
    TournamentModule,
    BetModule,
    TransactionModule,
    CommissionModule,
    AuthModule,
    GamerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? ".env" : `.env.${ENV}`,
      load: [appConfig],
      validationSchema: environmentValidation
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
