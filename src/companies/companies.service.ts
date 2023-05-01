import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CompanyEntity } from './entities/company.entity';
import { CompanyUpdateDto } from './dto/companyUpdate.dto';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
    ) {}

    async getCompanyById(id: string) {
        const company = await this.companyRepository.findOne({
            where: { id: id },
        });

        if (!company) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }

        return company;
    }

    async createCompany(request: CompanyUpdateDto) {
        const existingCompany = await this.companyRepository.findOne({
            where: { name: request.name, code: request.code },
        });

        if (existingCompany) {
            if (existingCompany.name === request.name) {
                throw new NotFoundException(
                    `Another company with name: ${request.name} exists`,
                );
            }

            if (existingCompany.code === request.code) {
                throw new NotFoundException(
                    `Another company with code: ${request.code} exists`,
                );
            }
        }

        const company = this.companyRepository.create(request);

        await this.companyRepository.save(company);
        return company;
    }

    async updateCompany(id: string, request: CompanyUpdateDto) {
        const existingCompany = await this.companyRepository.findOne({
            where: {
                id: Not(id),
                name: request.name,
                code: request.code,
            },
        });

        if (existingCompany) {
            if (existingCompany.name === request.name) {
                throw new NotFoundException(
                    `Another company with name: ${request.name} exists`,
                );
            }

            if (existingCompany.code === request.code) {
                throw new NotFoundException(
                    `Another company with code: ${request.code} exists`,
                );
            }
        }

        const company = await this.companyRepository.preload({
            id: id,
            ...request,
        });

        if (!company) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }
        return this.companyRepository.save(company);
    }

    async deleteCompany(id: string) {
        const company = await this.getCompanyById(id);
        return this.companyRepository.delete(company);
    }

    async getAllCompanies() {
        return await this.companyRepository.find();
    }
}
