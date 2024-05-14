import { Injectable } from '@nestjs/common';
import { ClientEntity } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { CompanyClientRelationEntity } from 'src/companies/entities/company-client-relation.entity';
import {
    SearchClientsByCompanyRequest,
    SearchClientsByCompanyResponse,
} from 'src/clients/models/GetCompanyClientsRequest';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientEntity)
        private readonly clientRepo: Repository<ClientEntity>,
        private dataSource: DataSource,
    ) {}

    async searchClientsByCompany({
        companyId,
        page,
        pageSize,
        filters,
    }: SearchClientsByCompanyRequest): Promise<SearchClientsByCompanyResponse> {
        const [relations, total] = await this.dataSource
            .getRepository(CompanyClientRelationEntity)
            .createQueryBuilder('relation')
            .where('relation.companyId = :companyId', { companyId })
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount();

        const clientIds = relations.map((r) => r.clientId);

        const clients = await this.clientRepo.findBy({
            id: In(clientIds),
        });

        return {
            total,
            page,
            pageSize,
            data: clients,
        };
    }
}
