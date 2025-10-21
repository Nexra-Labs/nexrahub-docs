import { Inject, Injectable } from '@nestjs/common';
import { MAILER_PROVIDER } from '../config/nodemailer.config';
import { Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {

    constructor(
        @Inject(MAILER_PROVIDER) private readonly transporter: Transporter,
        private readonly configService: ConfigService
    ) { }

    async sendVerificationCode(email: string, code: string): Promise<void> {
        await this.transporter.sendMail({
            from: `"Nexra" <${this.configService.get('appConfig.MAIL_USER')}>`,
            to: email,
            subject: 'Verify your account',
            html: `<p>Your verification code is: <b>${code}</b></p>`,
        });
    }
}