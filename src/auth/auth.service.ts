import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../user/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InvitationRequestDto } from './dto/InvitationRequest.dto';
import { MailService } from '../mail/mail.service';
import { LoginRequestDto } from './dto/LoginRequest.dto';
import { LoginResponseDto } from './dto/LoginResponse.dto';
import { RegistrationRequestDto } from './dto/RegistrationRequest.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private mailService: MailService,
    ) {}

    async login(loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
        const { email, password } = loginRequest;
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new NotFoundException('email or password is incorrect');
        }

        const passwordValid = await compare(password, user.password);

        if (!passwordValid) {
            throw new NotFoundException('email or password is incorrect');
        }

        const payload = { username: user.email, sub: user.id };

        return {
            jwt: await this.jwtService.signAsync(payload),
            user: user.toDto(),
        };
    }

    async invite(request: InvitationRequestDto) {
        const createdUser = await this.usersService.inviteUser(request);
        await this.mailService.senUserInvitation(createdUser);
    }

    async registerAdmin(
        request: RegistrationRequestDto,
        companyRegistrationId: string,
    ) {
        const user = await this.usersService.registerAdmin(
            request,
            companyRegistrationId,
        );
        const payload = { username: user.email, sub: user.id };
        return {
            jwt: await this.jwtService.signAsync(payload),
            user: user.toDto(),
        };
    }

    async register(
        request: RegistrationRequestDto,
        userRegistrationId: string,
    ) {
        const user = await this.usersService.register(
            request,
            userRegistrationId,
        );
        const payload = { username: user.email, sub: user.id };
        return {
            jwt: await this.jwtService.signAsync(payload),
            user: user.toDto(),
        };
    }

    // async confirmRegistration(registrationId: string) {
    //     const user = await this.usersService.findByRegistrationId(
    //         registrationId,
    //     );
    //     user.isEmailConfirmed = true;
    //     await this.usersService.saveUser(user);
    // }
}
