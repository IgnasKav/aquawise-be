import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from '../user/entities/user.entity';
import { CompanyEntity } from '../companies/entities/company.entity';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}
    async sendUserConfirmation(user: UserEntity) {
        const url = `${process.env.BE_URL}/auth/confirm/${user.registrationId}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to Aquawise! Confirm your Email',
            template: 'confirmation',
            context: {
                name: user.firstName,
                url,
            },
        });
    }

    async sendApplicationConfirmation(company: CompanyEntity) {
        const url = `${process.env.FE_URL}/auth/register/?applicationId=${company.applicationId}`;

        await this.mailerService.sendMail({
            to: company.email,
            subject: 'Your application has been approved!',
            template: 'applicationConfirmation',
            context: {
                companyName: company.name,
                url,
            },
        });
    }
}
