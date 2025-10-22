import {
    Controller,
    Patch,
    HttpCode,
    HttpStatus,
    Req,
    Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { UserService } from './providers/user.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { IUser } from './interfaces/user.interface';

@ApiTags('User')
@ApiSecurity('jwt-auth')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Patch('upgrade')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Upgrade user to developer account' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User successfully upgraded to developer',
        schema: {
            example: {
                message: 'User upgraded to developer successfully',
                role: 'developer',
            },
        },
    })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'User is already a developer' })
    async upgradeToDeveloper(@ActiveUser() user: IUser) {
        const result = await this.userService.upgradeToDeveloper(user.id);
        return { message: 'User upgraded to developer successfully', role: result.role };
    }

    //fetch loggedin user
    @Get('me')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Fetch loggedin user' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Loggedin user data fetched successfully',
        schema: {
            example: {
                "_id": "68f8d5eb71ee81dd785a2f6f",
                "username": "frozen_moon_0",
                "email": "chuksaginamada@gmail.com",
                "role": "user",
                "walletAddress": null,
                "balance": 0,
                "createdAt": "2025-10-22T13:02:35.951Z",
                "updatedAt": "2025-10-22T13:02:35.951Z"
            }
        },
    })
    async me(@ActiveUser() user: IUser) {
        return user;
    }
}
