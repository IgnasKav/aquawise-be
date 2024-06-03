import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CompanyEntity } from 'src/companies/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { IMailService } from '../models/IMailService';

@Injectable()
export class LocalMailService implements IMailService {
    constructor(private mailerService: MailerService) {}
    async senUserInvitation(user: UserEntity) {
        const invitationLink = `${process.env.FE_URL}/auth/register?registrationId=${user.userRegistrationId}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'You have been invited to Aquawise!',
            template: 'userInvitation',
            context: {
                companyName: user.company.name,
                invitationLink,
            },
        });
    }

    async sendApplicationConfirmation(
        company: CompanyEntity,
        user: UserEntity,
    ) {
        const invitationLink = `${process.env.FE_URL}/auth/register?registrationId=${user.userRegistrationId}`;

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Your application has been approved!',
            template: 'applicationConfirmation',
            context: {
                appName: 'Aquawise',
                companyName: company.name,
                invitationLink,
            },
        });
    }
}
