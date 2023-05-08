import { Injectable, NotFoundException } from '@nestjs/common';
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
        const newUser = new UserEntity({
            ...request,
            id: uuid(),
            company: { id: request.companyId } as CompanyEntity,
            userRegistrationId: uuid(),
            isRegistered: false,
        });
        return this.saveUser(newUser);
    }

    async registerAdmin(
        request: RegistrationRequestDto,
        companyRegistrationId,
    ) {
        const company = await this.companiesService.getByRegistrationId(
            companyRegistrationId,
        );

        const password = await hash(request.password, 12);

        const newUser = new UserEntity({
            ...request,
            id: uuid(),
            company: company,
            password: password,
            role: UserRole.Admin,
            isRegistered: false,
        });
        return this.saveUser(newUser);
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
        });

        if (!user) {
            throw new NotFoundException(
                `User with registrationId: ${registrationId} not found`,
            );
        }

        return user;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });

        return user;
    }
}
