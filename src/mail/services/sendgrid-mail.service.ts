import { Injectable } from '@nestjs/common';
import { CompanyEntity } from 'src/companies/entities/company.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { IMailService } from '../models/IMailService';
import * as sgMail from '@sendgrid/mail';
import * as handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class SendGridMailService implements IMailService {
    constructor() {
        sgMail.setApiKey(
            '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',
        );
    }

    async senUserInvitation(user: UserEntity) {
        const url = `${process.env.FE_URL}/auth/register/?userRegistrationId=${user.userRegistrationId}`;

        const html = this.getHtmlTemplate('userInvitation', {
            companyName: user.company.name,
            url,
        });

        const msg = {
            to: user.email,
            from: 'aquawise@devbroth.com',
            subject: 'You have been invited to Aquawise!',
            text: 'You have been invited to Aquawise!',
            html: html,
        };

        await sgMail.send(msg);
    }

    async sendApplicationConfirmation(
        company: CompanyEntity,
        user: UserEntity,
    ) {
        const invitationLink = `${process.env.FE_URL}/auth/register?registrationId=${user.id}`;

        const html = this.getHtmlTemplate('applicationConfirmation', {
            appName: 'Aquawise',
            companyName: company.name,
            invitationLink,
        });

        const msg = {
            to: user.email,
            from: 'aquawise@devbroth.com',
            subject: 'Your application has been approved!',
            text: 'Your application has been approved!',
            html: html,
        };

        await sgMail.send(msg);
    }

    private getHtmlTemplate(fileName: string, emailValues: object): string {
        const source = fs.readFileSync(
            `${__dirname}/templates/${fileName}.hbs'`,
            'utf8',
        );
        const template = handlebars.compile(source);
        const htmlToSend = template(emailValues);

        return htmlToSend;
    }
}
