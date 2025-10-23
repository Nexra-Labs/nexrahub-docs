import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { TournamentService } from './providers/tournament.service';
import { CreateTournamentDto } from './dtos/create-tournament.dto';
import { UpdateTournamentDto } from './dtos/update-tournament.dto';

@ApiTags('Tournaments')
@ApiSecurity('jwt-auth')
@Controller('tournament')
export class TournamentController {
    constructor(private readonly tournamentService: TournamentService) { }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a tournament' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Tournament created successfully',
        example: {
            schema: {
                "message": "Tournament created successfully",
                "tournament": {
                    "game": {
                        "_id": "68f9ce6d27a07cdb23dd65c7",
                        "name": "Battle Arenaa",
                        "id": "68f9ce6d27a07cdb23dd65c7"
                    },
                    "name": "Battle of Nexra",
                    "description": "An intense tournament for top gamers",
                    "entryFee": 50,
                    "prizePool": 0,
                    "status": "pending",
                    "startTime": "2025-11-10T18:00:00.000Z",
                    "endTime": "2025-11-10T21:00:00.000Z",
                    "winner": null,
                    "_id": "68fa2b750366dd5ff66d599d",
                    "createdAt": "2025-10-23T13:19:49.620Z",
                    "updatedAt": "2025-10-23T13:19:49.620Z",
                    "id": "68fa2b750366dd5ff66d599d"
                }
            }
        }
    })
    async create(@Body() dto: CreateTournamentDto) {
        const result = await this.tournamentService.createTournament(dto);
        return { message: 'Tournament created successfully', tournament: result };
    }

    @Patch('update/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Update a pending tournament (if not started)' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Tournament updated successfully',
        example: {
            schema: {
                "message": "Tournament updated successfully",
                "tournament": {
                    "_id": "68fa2b750366dd5ff66d599d",
                    "game": {
                        "_id": "68f9ce6d27a07cdb23dd65c7",
                        "name": "Battle Arenaa",
                        "id": "68f9ce6d27a07cdb23dd65c7"
                    },
                    "name": "Battle of Nexra",
                    "description": "An intense tournament for top gamers",
                    "entryFee": 50,
                    "prizePool": 0,
                    "status": "pending",
                    "startTime": "2025-11-10T18:00:00.000Z",
                    "endTime": "2025-11-10T21:00:00.000Z",
                    "winner": null,
                    "createdAt": "2025-10-23T13:19:49.620Z",
                    "updatedAt": "2025-10-23T13:19:49.620Z",
                    "id": "68fa2b750366dd5ff66d599d"
                }
            }
        }
    })
    async update(@Param('id') id: string, @Body() dto: UpdateTournamentDto) {
        const result = await this.tournamentService.updateTournament(id, dto);
        return { message: 'Tournament updated successfully', tournament: result };
    }

    @Patch('publish/:id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Publish a pending tournament that has not yet started' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Tournament published successfully',
        example: {
            schema: {
                "message": "Tournament published successfully",
                "tournament": {
                    "_id": "68fa2b750366dd5ff66d599d",
                    "game": {
                        "_id": "68f9ce6d27a07cdb23dd65c7",
                        "name": "Battle Arenaa",
                        "id": "68f9ce6d27a07cdb23dd65c7"
                    },
                    "name": "Battle of Nexra",
                    "description": "An intense tournament for top gamers",
                    "entryFee": 50,
                    "prizePool": 0,
                    "status": "published",
                    "startTime": "2025-11-10T18:00:00.000Z",
                    "endTime": "2025-11-10T21:00:00.000Z",
                    "winner": null,
                    "createdAt": "2025-10-23T13:19:49.620Z",
                    "updatedAt": "2025-10-23T13:42:12.609Z",
                    "id": "68fa2b750366dd5ff66d599d"
                }
            }
        }
    })
    async publish(@Param('id') id: string) {
        const result = await this.tournamentService.publishTournament(id);
        return { message: 'Tournament published successfully', tournament: result };
    }
}
