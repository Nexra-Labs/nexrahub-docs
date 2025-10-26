import { Module } from '@nestjs/common';
import { CommissionController } from './commission.controller';

@Module({
  controllers: [CommissionController]
})
export class CommissionModule {}
