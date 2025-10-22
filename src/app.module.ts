import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { OtpModule } from './otp/otp.module';
import appConfig from './config/app.config';
import environmentValidation from './config/environment.validation';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './commonModule/logger.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './commonModule/http-exception.filter';
import { AuthorizationGuard } from './auth/guards/authorization.guard';
import { AuthenticationGuard } from './auth/guards/authentication.guard';
import { MongoExceptionFilter } from './commonModule/mongo-exception.filter';
import { SecurityModule } from './security/security.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    DatabaseModule,
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
    }),
    OtpModule,
    SecurityModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
