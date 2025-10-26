import { Injectable } from '@nestjs/common';
import { OtpRepository } from '../repositories/otp.repository';
import { MailerService } from 'src/mailer/providers/user.mailer.provider';

@Injectable()
export class OtpService {
    constructor(
        private readonly otpRepo: OtpRepository,
        private readonly mailerService: MailerService
    ) { }

    private generateCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async sendOtp(email: string) {

        const exists = await this.otpRepo.exists({ email });
        const code = this.generateCode();

        if (exists) {
            await this.otpRepo.updateOne({ email }, { code, expiresAt: new Date(Date.now() + 5 * 60 * 1000) });
        } else {
            await this.otpRepo.create({
                email,
                code,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            });
        }

        await this.mailerService.sendVerificationCode(email, code);
        return { email };
    }

    async verifyOtp(email: string, code: string): Promise<boolean> {
        const otp = await this.otpRepo.findOne({ email, code, expiresAt: { $gt: new Date() } });
        if (!otp) return false;
        await this.otpRepo.deleteById(otp._id);
        return true;
    }
}
