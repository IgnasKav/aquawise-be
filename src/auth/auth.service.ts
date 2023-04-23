import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { RegisterRequestDto } from './dto/registerRequest.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      return null;
    }
    return user;
  }

  async login(user: UserEntity): Promise<any> {
    if (!user.isEmailConfirmed) {
      throw new UnauthorizedException('Please confirm your email');
    }
    const payload = { username: user.email, sub: user.id };

    return {
      jwt: await this.jwtService.signAsync(payload),
    };
  }

  async register(request: RegisterRequestDto) {
    const newUser = await this.usersService.register(request);
    await this.mailService.sendUserConfirmation(newUser);
  }

  async confirmRegistration(registrationId: string) {
    const user = await this.usersService.findByRegistrationId(registrationId);
    user.isEmailConfirmed = true;
    await this.usersService.saveUser(user);
  }
}
