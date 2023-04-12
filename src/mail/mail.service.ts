import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirmation(user: UserEntity) {
    const url = `http://localhost:3000/auth/confirm/${user.registrationId}`;

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
}
