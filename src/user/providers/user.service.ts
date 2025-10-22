import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../interfaces/user.interface';
import { generateUniqueUsername } from '../utils/username.utils';
import { UserRole } from '../enums/user-role.enum';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) { }

    async findByEmail(email: string): Promise<IUser | null> {
        return this.userRepo.findOne({ email });
    }

    async findByUsername(username: string): Promise<IUser | null> {
        return this.userRepo.findOne({ username });
    }

    async createUser(email: string) {
        let username: string;
        do {
            username = await generateUniqueUsername();
        } while (await this.findByUsername(username));

        return this.userRepo.create({ email, username });
    }

    async upgradeToDeveloper(userId: string | Types.ObjectId): Promise<IUser> {
        const user = await this.userRepo.findById(userId);
        if (!user) throw new NotFoundException('User not found');

        if (user.role === UserRole.DEVELOPER) {
            throw new BadRequestException('User is already a developer');
        }

        user.role = UserRole.DEVELOPER;
        await user.save();

        return user;
    }

    async findUserById(userId: string): Promise<IUser | null> {
        return this.userRepo.findById(userId);
    }
}
