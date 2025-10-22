import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { IUser } from '../interfaces/user.interface';
import { generateUniqueUsername } from '../utils/username.utils';

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
}
