import { DynamicModule, Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { LocalMailService } from './services/local-mail.service';
import { SendGridMailService } from './services/sendgrid-mail.service';

// if env is prod no need to import mailer module also remove mails container from prod docker-compose
@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async () => ({
                transport: {
                    host: process.env.MAIL_HOST,
                    port: +process.env.MAIL_PORT,
                    secure: false,
                },
                defaults: {
                    from: `"No Reply" <${process.env.MAIL_USER}>`,
                },
                template: {
                    dir: `dist/mail/templates`,
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
    ],
    providers: [
        {
            provide: 'IMailService',
            useClass:
                process.env.NODE_ENV === 'prod'
                    ? SendGridMailService
                    : LocalMailService,
        },
    ],
    exports: ['IMailService'],
})
export class MailModule {}
