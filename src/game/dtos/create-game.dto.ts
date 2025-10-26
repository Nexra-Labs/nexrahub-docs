import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsUrl, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateGameDto {
    @IsString()
    @ApiProperty({
        example: 'Battle Arena',
        description: 'Name of the game',
        required: true
    })
    name: string;

    @IsString()
    @ApiProperty({
        example: 'An intense multiplayer battle arena game.',
        description: 'Description of the game',
        required: true
    })
    description: string;

    @IsOptional()
    @IsUrl()
    @ApiProperty({
        example: 'https://game-website.com',
        required: true,
        description: 'Official website of the game'
    })
    website: string;

    @IsString()
    @IsUrl()
    @ApiProperty({
        example: 'https://cdn.com/game-banner.jpg',
        required: true,
        description: 'Banner image URL for the game'
    })
    banner: string;

    @IsMongoId({ each: true })
    @ApiProperty({
        example: ['6716a5097b6a0b214b9de701'],
        description: 'Genre ID',
        required: true,
        isArray: true
    })
    genre: Types.ObjectId[];

    @IsOptional()
    @IsArray()
    @ApiProperty({
        example: ['action', 'multiplayer'],
        required: false,
        description: 'Tags associated with the game',
        isArray: true
    })
    tags?: string[];
}
