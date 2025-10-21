import { Module } from '@nestjs/common';
import { GamerController } from './gamer.controller';

@Module({
  controllers: [GamerController]
})
export class GamerModule {}
