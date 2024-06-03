import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InvitationRequestDto } from './dto/InvitationRequest.dto';
import { LoginRequestDto } from './dto/LoginRequest.dto';
import { LoginResponseDto } from './dto/LoginResponse.dto';
import { UserRegistrationRequestDto } from './dto/RegistrationRequest.dto';
import { IMailService } from 'src/mail/models/IMailService';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
        @Inject('IMailService') private mailService: IMailService,
    ) {}

    async login(loginRequest: LoginRequestDto): Promise<LoginResponseDto> {
        const { email, password } = loginRequest;
        const user = await this.userRepository.findOne({
            where: { email },
            relations: { company: true },
        });

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
        // const createdUser = await this.usersService.inviteUser(request);
        // await this.mailService.senUserInvitation(createdUser);
    }

    async register(request: UserRegistrationRequestDto) {
        const user = await this.userRepository.findOne({
            where: { userRegistrationId: request.registrationId },
        });

        if (!user) {
            throw new NotFoundException(
                `User with registrationId: ${request.registrationId} does not exist`,
            );
        }

        user.firstName = request.firstName;
        user.lastName = request.lastName;
        user.email = request.email;
        user.phone = request.phone;
        user.password = await hash(request.password, 12);
        user.userRegistrationId = null;

        await this.userRepository.save(user);
    }

    async findUserByRegistrationId(
        registrationId: string,
    ): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { userRegistrationId: registrationId },
            relations: { company: true },
        });

        if (!user) {
            throw new NotFoundException(
                `User with registrationId: ${registrationId} not found`,
            );
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { email: email },
            relations: { company: true },
        });

        if (!user) {
            throw new NotFoundException(`User with email: ${email} not found`);
        }

        return user;
    }
}
