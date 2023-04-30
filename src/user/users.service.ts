import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterRequestDto } from '../auth/dto/registerRequest.dto';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async saveUser(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

    async register(request: RegisterRequestDto): Promise<UserEntity> {
        const existingUser = await this.findByEmail(request.email);
        if (existingUser) {
            throw new BadRequestException(
                'User already exists with this email',
            );
        }

        const registrationId = uuid();
        const password = await hash(request.password, 12);
        const newUser = new UserEntity({
            ...request,
            id: uuid(),
            password: password,
            registrationId: registrationId,
            isEmailConfirmed: false,
        });
        return this.saveUser(newUser);
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });

        return user;
    }

    async findByRegistrationId(registrationId: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { registrationId: registrationId },
        });

        if (!user) {
            throw new NotFoundException(
                `User with registrationId: ${registrationId} does not exist`,
            );
        }

        return user;
    }
}
