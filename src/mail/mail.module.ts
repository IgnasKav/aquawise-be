import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

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
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
