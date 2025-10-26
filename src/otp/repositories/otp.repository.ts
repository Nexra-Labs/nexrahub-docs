import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOtp } from '../interfaces/otp.interface';
import { BaseRepository } from 'src/commonModule/base.repository';
import { Otp } from '../schemas/otp.schema';

@Injectable()
export class OtpRepository extends BaseRepository<IOtp> {
    constructor(@InjectModel(Otp.name) otpModel: Model<IOtp>) {
        super(otpModel);
    }
}
