import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiSecurity,
} from '@nestjs/swagger';
import { TournamentEntryService } from './providers/tournament-entry.service';
import { CreateTournamentEntryDto } from './dtos/create-tournament-entry.dto';

@ApiTags('Tournament Entry')
@ApiSecurity('jwt-auth')
@Controller()
export class TournamentEntryController {
    constructor(private readonly tournamentEntryService: TournamentEntryService) { }

    @Post(':tournamentId/join')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Enter a gamer into a tournament',
        description:
            'Creates a gamer if not existing, adds them to the tournament, creates their bet option, and updates the prize pool.',
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Successfully joined the tournament.',
        schema: {
            example: {
                message: 'Gamer successfully joined the tournament.',
                entry: {
                    id: '6718ac03e0ad9b01f43b76b3',
                    tournament: '6718a8dde0ad9b01f43b76a2',
                    gamer: '6718ab5ee0ad9b01f43b76a8',
                    entryFee: 100,
                    joinedAt: '2025-10-23T13:25:48.112Z',
                    eliminated: false,
                    eliminatedAt: null,
                    rank: null,
                    createdAt: '2025-10-23T13:25:48.112Z',
                    updatedAt: '2025-10-23T13:25:48.112Z',
                }
            }
        }
    })
    async joinTournament(@Param('tournamentId') tournamentId: string, @Body() dto: CreateTournamentEntryDto) {
        const entry = await this.tournamentEntryService.enterTournament( tournamentId, dto);
        return {
            message: 'Gamer successfully joined the tournament.',
            entry
        };
    }
}
