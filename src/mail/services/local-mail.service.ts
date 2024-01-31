import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CompanyEntity } from 'src/companies/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { IMailService } from '../models/IMailService';

@Injectable()
export class LocalMailService implements IMailService {
    constructor(private mailerService: MailerService) {}
    async senUserInvitation(user: UserEntity) {
        console.log('Sending email to: ', user.email);
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
        const invitationLink = `${process.env.FE_URL}/auth/register/companyId=${company.id}`;

        await this.mailerService.sendMail({
            to: company.email,
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
