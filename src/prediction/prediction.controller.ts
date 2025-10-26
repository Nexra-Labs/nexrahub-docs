import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PredictionService } from './providers/prediction.service';
import { CreatePredictionDto } from './dtos/create-prediction.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';

@ApiTags('Prediction')
@ApiSecurity('jwt-auth')
@Controller('prediction')
export class PredictionController {
    constructor(private readonly predictionService: PredictionService) { }

    @Post('predict')
    @ApiOperation({
        summary: 'Place a prediction',
        description: 'Allows a user to place a prediction and updates the total amount in the related prediction option.',
    })
    @ApiResponse({
        status: 201,
        description: 'Prediction placed successfully',
        schema: {
            example: {
                "message": "Prediction placed successfully",
                "prediction": {
                    "_id": "68fcc01bb3315090e6bb4cf8",
                    "bettor": "68f8d5eb71ee81dd785a2f6f",
                    "predictionOption": {
                        "_id": "68fcbfeeb3315090e6bb4cf1",
                        "tournament": {
                            "_id": "68fa2dbd186115a612e75e13",
                            "name": "Battle of Nexra2",
                            "description": "An intense tournament for top gamers",
                            "totalPredictionAmount": 250,
                            "id": "68fa2dbd186115a612e75e13"
                        },
                        "gamer": {
                            "_id": "68fcbfeeb3315090e6bb4cea",
                            "gamerId": "dark gamer",
                            "id": "68fcbfeeb3315090e6bb4cea"
                        },
                        "totalPredictionAmount": 50,
                        "odds": 5,
                        "id": "68fcbfeeb3315090e6bb4cf1"
                    },
                    "amount": 50,
                    "oddsAtPlacement": 200,
                    "status": "pending",
                    "createdAt": "2025-10-25T12:18:35.482Z",
                    "id": "68fcc01bb3315090e6bb4cf8",
                    "potentialPayout": 250
                }
            }
        }
    })
    async makePrediction(@Body() dto: CreatePredictionDto, @ActiveUser() user: IUser) {
        const prediction = await this.predictionService.createPrediction(user._id, dto);
        return { message: 'Prediction placed successfully', prediction };
    }
}
