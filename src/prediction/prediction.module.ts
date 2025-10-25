import { Module } from '@nestjs/common';
import { PredictionController } from './prediction.controller';
import { PredictionOptionService } from './providers/prediction/prediction-option.service';
import { PredictionOptionRepository } from './repositories/prediction-option.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { PredictionOption, PredictionOptionSchema } from './schemas/prediction-option.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PredictionOption.name, schema: PredictionOptionSchema }])],
  controllers: [PredictionController],
  providers: [PredictionOptionService, PredictionOptionRepository],
  exports: [PredictionOptionService]
})
export class PredictionModule {}
