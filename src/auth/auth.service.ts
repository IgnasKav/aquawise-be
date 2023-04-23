import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterRequestDto } from './dto/registerRequest.dto';
import { MailService } from '../mail/mail.service';
import { LoginRequestDto } from './dto/LoginRequest.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login(loginRequest: LoginRequestDto): Promise<any> {
    const { email, password } = loginRequest;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('email or password is incorrect');
    }

    if (!user.isEmailConfirmed) {
      throw new UnauthorizedException('Please confirm your email');
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new NotFoundException('email or password is incorrect');
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
