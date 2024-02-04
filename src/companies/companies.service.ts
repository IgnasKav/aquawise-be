import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity, CompanyStatus } from './entities/company.entity';
import { CompanyUpdateDto } from './dto/companyUpdate.dto';
import { CompanyCreateDto } from './dto/companyCreate.dto';
import { v4 as uuid } from 'uuid';
import { IMailService } from 'src/mail/models/IMailService';
import { UserEntity, UserRole } from 'src/user/entities/user.entity';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject('IMailService') private mailService: IMailService,
    ) {}

    async getCompanyById(id: string) {
        const company = await this.companyRepository.findOne({
            where: { id: id },
            relations: { users: true },
        });

        if (!company) {
            throw new NotFoundException(`Company with id: ${id} not found`);
        }

        return company;
    }

    async confirmApplication(id: string) {
        const company = await this.companyRepository.findOne({
            where: { id: id },
        });

        if (!company) {
            throw new NotFoundException(`Company with id: ${id} not found`);
        }

        if (company.status === CompanyStatus.Confirmed) {
            return;
        }

        company.status = CompanyStatus.Confirmed;

        const adminUser = await this.userRepository.create({
            id: uuid(),
            email: company.email,
            firstName: `${company.name} Admin`,
            lastName: '',
            password: '',
            role: UserRole.Admin,
            company: company,
            userRegistrationId: uuid(),
        });

        await this.mailService.sendApplicationConfirmation(company, adminUser);

        await this.companyRepository.save(company);
        await this.userRepository.save(adminUser);
    }

    async applyForCompanyAccount(request: CompanyCreateDto) {
        const userWithSameEmail = await this.userRepository.findOne({
            where: { email: request.email },
        });

        if (userWithSameEmail) {
            throw new BadRequestException(
                `User with email: ${request.email} already exists`,
            );
        }

        const existingCompany = await this.companyRepository.findOne({
            where: [
                { name: request.name },
                { code: request.code },
                { email: request.email },
            ],
        });

        if (existingCompany) {
            if (existingCompany.name === request.name) {
                throw new BadRequestException(
                    `Another company with name: ${request.name} already exists`,
                );
            }

            if (existingCompany.code === request.code) {
                throw new BadRequestException(
                    `Another company with code: ${request.code} already exists`,
                );
            }

            if (existingCompany.email === request.email) {
                throw new BadRequestException(
                    `Another company with email: ${request.email} already exists`,
                );
            }
        }

        const company = this.companyRepository.create({
            ...request,
            id: uuid(),
            status: CompanyStatus.ApplicationPending,
        });

        await this.companyRepository.save(company);
        return company;
    }

    async updateCompany(id: string, request: CompanyUpdateDto) {
        if (request.image) {
            const imageUrl = `${process.env.BE_URL}/${request.image.imageUrl}`;
        }

        const company = await this.companyRepository.preload({
            id: id,
            brandColor: request.brandColor,
            ...request,
        });

        if (!company) {
            throw new NotFoundException(`Company with id: ${id} not found`);
        }
        return this.companyRepository.save(company);
    }

    async deleteCompany(id: string) {
        const company = await this.getCompanyById(id);
        //return this.companyRepository.delete();
    }

    async getAllCompanies() {
        return await this.companyRepository.find();
    }
}
