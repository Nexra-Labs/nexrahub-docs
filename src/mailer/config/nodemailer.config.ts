import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export const MAILER_PROVIDER = 'MAILER_PROVIDER';

export const MailerConfig: Provider = {
    provide: MAILER_PROVIDER,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        const mailHost = configService.get<string>('appConfig.MAIL_HOST');
        const mailPort = configService.get<number>('appConfig.MAIL_PORT');
        const mailUser = configService.get<string>('appConfig.MAIL_USER');
        const mailPass = configService.get<string>('appConfig.MAIL_PASS');

        return nodemailer.createTransport({
            host: mailHost,
            port: Number(mailPort),
            secure: true,
            auth: {
                user: mailUser,
                pass: mailPass,
            },
        });
    },
};