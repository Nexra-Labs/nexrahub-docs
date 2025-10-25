import { forwardRef, Module } from '@nestjs/common';
import { PredictionController } from './prediction.controller';
import { PredictionOptionService } from './providers/prediction-option.service';
import { PredictionOptionRepository } from './repositories/prediction-option.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { PredictionOption, PredictionOptionSchema } from './schemas/prediction-option.schema';
import { PredictionService } from './providers/prediction.service';
import { PredictionRepository } from './repositories/prediction.repository';
import { Prediction, PredictionSchema } from './schemas/prediction.schema';
import { TournamentModule } from 'src/tournament/tournament.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PredictionOption.name, schema: PredictionOptionSchema }]),
    MongooseModule.forFeature([{ name: Prediction.name, schema: PredictionSchema }]),
    forwardRef(() => TournamentModule)
  ],
  controllers: [PredictionController],
  providers: [PredictionOptionService, PredictionOptionRepository, PredictionService, PredictionRepository],
  exports: [PredictionOptionService]
})
export class PredictionModule { }
