import { Module } from '@nestjs/common';
import { BetController } from './bet.controller';
import { BetOptionService } from './providers/bet-option.service';
import { BetOptionRepository } from './repositories/bet-option.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BetOption, BetOptionSchema } from './schemas/bet-option.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BetOption.name, schema: BetOptionSchema }])],
  controllers: [BetController],
  providers: [BetOptionService, BetOptionRepository],
  exports: [BetOptionService]
})
export class BetModule {}
