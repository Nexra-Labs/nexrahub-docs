import {
    Body,
    Controller,
    Get,
    Post,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiSecurity,
} from '@nestjs/swagger';
import { GameGenreService } from './providers/game-genre.service';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { Authorize } from 'src/auth/decorators/authorize.decorator';
import { UserRole } from 'src/user/enums/user-role.enum';

@ApiTags('Game Genre')
@ApiSecurity('jwt-auth')
@Controller('game/genre')
export class GameGenreController {
    constructor(private readonly genreService: GameGenreService) { }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @Authorize(UserRole.ADMIN)
    @ApiOperation({ summary: 'Create a new game genre' })
    @ApiResponse({
        status: 201,
        description: 'Genre created successfully',
        schema: {
            example: {
                "message": "Genre created",
                "genre": {
                    "genre": "action",
                    "_id": "68f9c676fa4b381c1f14a47d",
                    "createdAt": "2025-10-23T06:08:54.557Z",
                    "id": "68f9c676fa4b381c1f14a47d"
                }
            }
        }
    })
    async createGenre(@Body() dto: CreateGenreDto) {
        const genre = await this.genreService.createGenre(dto);
        return { message: 'Genre created', genre };
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Fetch all game genres' })
    @ApiResponse({
        status: 200,
        description: 'List of genres fetched successfully',
        schema: {
            example: {
                "message": "Genres fetched successfully",
                "genres": [
                    {
                        "_id": "68f9c676fa4b381c1f14a47d",
                        "genre": "action",
                        "id": "68f9c676fa4b381c1f14a47d"
                    }
                ]
            }
        }
    })
    async fetchAllGenres() {
        const genres = await this.genreService.fetchAllGenres();
        return { message: 'Genres fetched successfully', genres };
    }
}
