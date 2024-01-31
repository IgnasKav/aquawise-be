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

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
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
        const company = await this.getCompanyById(id);

        const updatedCompany = await this.companyRepository.preload({
            id: company.id,
            status: CompanyStatus.Confirmed,
        });

        await this.mailService.sendApplicationConfirmation(company);
        return this.companyRepository.save(updatedCompany);
    }

    async applyForCompanyAccount(request: CompanyCreateDto) {
        const existingCompany = await this.companyRepository.findOne({
            where: [{ name: request.name }, { code: request.code }],
        });

        if (existingCompany) {
            if (existingCompany.name === request.name) {
                throw new BadRequestException(
                    `Another company with name: ${request.name} exists`,
                );
            }

            if (existingCompany.code === request.code) {
                throw new BadRequestException(
                    `Another company with code: ${request.code} exists`,
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
