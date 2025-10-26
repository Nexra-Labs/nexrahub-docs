import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './schemas/otp.schema';
import { OtpService } from './providers/otp.service';
import { OtpRepository } from './repositories/otp.repository';
import { OtpController } from './otp.controller';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]), MailerModule],
    controllers: [OtpController],
    providers: [OtpService, OtpRepository],
    exports: [OtpService],
})
export class OtpModule { }
