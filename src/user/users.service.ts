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
import { UserRegistrationRequestDto } from '../auth/dto/RegistrationRequest.dto';
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
