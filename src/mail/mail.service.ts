import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from '../user/entities/user.entity';
import { CompanyEntity } from '../companies/entities/company.entity';

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
        const url = `${process.env.FE_URL}/auth/register/?companyRegistrationId=${company.companyRegistrationId}`;

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
