import { Module } from '@nestjs/common';
import { GamerController } from './gamer.controller';
import { GamerService } from './providers/gamer.service';
import { GamerRepository } from './repositories/gamer.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Gamer, GamerSchema } from './schemas/gamer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Gamer.name, schema: GamerSchema }])],
  controllers: [GamerController],
  providers: [GamerService, GamerRepository],
  exports: [GamerService]
})
export class GamerModule {}
