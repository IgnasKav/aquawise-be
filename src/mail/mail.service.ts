import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from '../user/entities/user.entity';
import { CompanyEntity } from '../companies/entities/company.entity';

import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}
    async senUserInvitation(user: UserEntity) {
        const url = `${process.env.FE_URL}/auth/register/?userRegistrationId=${user.userRegistrationId}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'You have been invited to Aquawise!',
            template: 'userInvitation',
            context: {
                companyName: user.company.name,
                url,
            },
        });
    }

    async sendApplicationConfirmation(company: CompanyEntity) {
        const invitationLink = `${process.env.FE_URL}/auth/register/?companyRegistrationId=${company.companyRegistrationId}`;

        await this.mailerService.sendMail({
            to: company.email,
            subject: 'Your application has been approved!',
            template: 'applicationConfirmation',
            context: {
                appName: process.env.APP_NAME,
                companyName: company.name,
                invitationLink,
            },
        });
    }
}
