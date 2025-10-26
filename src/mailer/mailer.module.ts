import { Module } from '@nestjs/common';
import { MailerService } from './providers/user.mailer.provider';
import { MailerConfig } from './config/nodemailer.config';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [MailerConfig, MailerService],
    exports: [MailerService]
})
export class MailerModule { }
