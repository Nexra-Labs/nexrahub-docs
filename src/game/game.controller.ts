import {
    Body,
    Controller,
    Post,
    Patch,
    Get,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiSecurity,
} from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';
import { GameService } from './providers/game.service';
import { CreateGameDto } from './dtos/create-game.dto';
import { UpdateGameDto } from './dtos/update-game.dto';
import { Authorize } from 'src/auth/decorators/authorize.decorator';
import { UserRole } from 'src/user/enums/user-role.enum';
import { ApikeyDto } from './dtos/apikey.dto';

@ApiTags('Game')
@ApiSecurity('jwt-auth')
@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) { }

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @Authorize(UserRole.DEVELOPER)
    @ApiOperation({ summary: 'Create a new game' })
    @ApiResponse({
        status: 201,
        description: 'Game created successfully',
        schema: {
            example: {
                "message": "Game created successfully",
                "game": {
                    "_id": "68f9cab3ab7bb4057203f470",
                    "name": "Battle Arena",
                    "banner": "https://cdn.com/game-banner.jpg",
                    "description": "An intense multiplayer battle arena game.",
                    "website": "https://game-website.com",
                    "genre": [
                        {
                            "_id": "68f9c676fa4b381c1f14a47d",
                            "genre": "action",
                            "id": "68f9c676fa4b381c1f14a47d"
                        }
                    ],
                    "tags": [
                        "action",
                        "multiplayer"
                    ],
                    "isActive": true,
                    "createdAt": "2025-10-23T06:26:59.642Z",
                    "slug": "battle-arena",
                    "apiKey": "nexra_e738a4f246da347b1a7696c5d1279c1d",
                    "id": "68f9cab3ab7bb4057203f470"
                }
            }
        }
    })
    async createGame(@ActiveUser() user: IUser, @Body() dto: CreateGameDto) {
        const result = await this.gameService.createGame(dto, user.id);
        return { message: 'Game created successfully', game: result };
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @Authorize(UserRole.DEVELOPER)
    @ApiOperation({ summary: 'Update a game' })
    @ApiResponse({
        status: 200,
        description: 'Game updated successfully',
        schema: {
            example: {
                "message": "Game updated successfully",
                "game": {
                    "_id": "68f9cb7995b222b91665469c",
                    "name": "Battle Arena2",
                    "banner": "https://cdn.com/game-banner.jpg",
                    "description": "An intense multiplayer battle arena game.",
                    "website": "https://game-website.com",
                    "genre": [
                        {
                            "_id": "68f9c676fa4b381c1f14a47d",
                            "genre": "action",
                            "id": "68f9c676fa4b381c1f14a47d"
                        }
                    ],
                    "tags": [
                        "action",
                        "multiplayer"
                    ],
                    "isActive": true,
                    "createdAt": "2025-10-23T06:30:17.149Z",
                    "slug": "battle-arena",
                    "id": "68f9cb7995b222b91665469c"
                }
            }
        }
    })
    async updateGame(
        @ActiveUser() user: IUser,
        @Param('id') id: string,
        @Body() dto: UpdateGameDto,
    ) {
        const result = await this.gameService.updateGame(id, dto, user.id);
        return { message: 'Game updated successfully', game: result };
    }

    @Get('my')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Fetch all games created by logged-in user' })
    @ApiResponse({
        status: 200,
        description: 'List of user games fetched successfully',
        schema: {
            example: {
                "message": "List of user games fetched successfully",
                "games": [
                    {
                        "_id": "68f9cb7995b222b91665469c",
                        "name": "Battle Arena2",
                        "banner": "https://cdn.com/game-banner.jpg",
                        "description": "An intense multiplayer battle arena game.",
                        "website": "https://game-website.com",
                        "genre": [
                            "68f9c676fa4b381c1f14a47d"
                        ],
                        "tags": [
                            "action",
                            "multiplayer"
                        ],
                        "developer": "68f8d5eb71ee81dd785a2f6f",
                        "isActive": true,
                        "createdAt": "2025-10-23T06:30:17.149Z",
                        "updatedAt": "2025-10-23T06:34:06.654Z",
                        "slug": "battle-arena",
                        "id": "68f9cb7995b222b91665469c"
                    }
                ]
            }
        }
    })
    async fetchUserGames(@ActiveUser() user: IUser) {
        const result = await this.gameService.fetchUserGames(user.id);
        return { message: 'List of user games fetched successfully', games: result };
    }

    @Post(':id/view-apikey')
    @HttpCode(HttpStatus.OK)
    @Authorize(UserRole.DEVELOPER)
    @ApiOperation({ summary: 'View game API key (OTP required)' })
    @ApiResponse({
        status: 200,
        description: 'API key fetched successfully',
        schema: {
            example: {
                "message": "API key fetched successfully",
                "result": {
                    "apiKey": "nexra_78629bc0147e655599706188aacb0c48"
                }
            }
        }
    })
    async viewApiKey(
        @ActiveUser() user: IUser,
        @Param('id') id: string,
        @Body() dto: ApikeyDto
    ) {
        const result = await this.gameService.viewApiKey(id, user.id, user.email, dto.code);
        return { message: 'API key fetched successfully', result };
    }

    @Post(':id/regenerate-apikey')
    @HttpCode(HttpStatus.OK)
    @Authorize(UserRole.DEVELOPER)
    @ApiOperation({ summary: 'Regenerate game API key (OTP required)' })
    @ApiResponse({
        status: 200,
        description: 'API key fetched successfully',
        schema: {
            example: {
                "message": "API key regenerated successfully",
                "result": {
                    "apiKey": "nexra_abea6077b25d793f1e8b6ff2e48d5f08"
                }
            }
        }
    })
    async regenerateApiKey(
        @ActiveUser() user: IUser,
        @Param('id') id: string,
        @Body() dto: ApikeyDto
    ) {
        const result = await this.gameService.regenerateApiKey(id, user.id, user.email, dto.code);
        return { message: 'API key regenerated successfully', result };
    }
}
