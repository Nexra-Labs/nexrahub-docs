import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { BaseRepository } from 'src/commonModule/base.repository';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<IUser> {
    constructor(@InjectModel(User.name) userModel: Model<IUser>) {
        super(userModel);
    }
}
