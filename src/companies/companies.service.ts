import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CompanyEntity, CompanyStatus } from './entities/company.entity';
import { CompanyCreateDto } from './dto/companyCreate.dto';
import { v4 as uuid } from 'uuid';
import { IMailService } from 'src/mail/models/IMailService';
import { UserEntity } from 'src/user/entities/user.entity';
import transactionRunner from 'src/common/db-transaction-runner';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject('IMailService')
        private mailService: IMailService,
        private dataSource: DataSource,
    ) {}

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

    // support

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
            role: 'admin',
            company: company,
            userRegistrationId: uuid(),
        });

        await transactionRunner(this.dataSource, async (queryRunner) => {
            await queryRunner.manager.save(company);
            await queryRunner.manager.save(adminUser);

            await this.mailService.sendApplicationConfirmation(
                company,
                adminUser,
            );
        });
    }

    async getAllCompanies() {
        return await this.companyRepository.find();
    }
}
