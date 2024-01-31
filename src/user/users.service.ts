import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { InvitationRequestDto } from '../auth/dto/InvitationRequest.dto';
import { RegistrationRequestDto } from '../auth/dto/RegistrationRequest.dto';
import { CompanyEntity } from '../companies/entities/company.entity';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly companiesService: CompaniesService,
    ) {}

    async saveUser(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

    async inviteUser(request: InvitationRequestDto): Promise<UserEntity> {
        const foundUser = await this.findByEmail(request.email);
        if (foundUser != null) {
            throw new ConflictException('User with this email already exists');
        }
        const newUser = new UserEntity({
            ...request,
            id: uuid(),
            company: { id: request.companyId } as CompanyEntity,
            userRegistrationId: uuid(),
            isRegistered: false,
        });
        await this.saveUser(newUser);
        return await this.userRepository.findOne({
            where: { id: newUser.id },
            relations: { company: true },
        });
    }

    async register(
        request: RegistrationRequestDto,
        userRegistrationId: string,
    ): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { userRegistrationId: userRegistrationId },
        });

        if (!user) {
            throw new NotFoundException(
                `User with registrationId: ${userRegistrationId} does not exist`,
            );
        }

        const password = await hash(request.password, 12);

        const updatedUser = await this.userRepository.preload({
            id: user.id,
            ...request,
            password: password,
            userRegistrationId: null,
            isRegistered: true,
        });

        return this.saveUser(updatedUser);
    }

    async findByRegistrationId(registrationId: string) {
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

    async findById(id: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({
            where: { id: id },
            relations: { company: true },
        });
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { email: email },
            relations: { company: true },
        });
    }
}
