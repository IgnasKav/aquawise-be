import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { CompanyClientRelationEntity } from 'src/companies/entities/company-client-relation.entity';
import {
    SearchClientsByCompanyRequest,
    SearchClientsByCompanyResponse,
} from 'src/clients/models/GetCompanyClientsRequest';

@Injectable()
export class ClientsService {
    constructor(private dataSource: DataSource) {}

    async searchClientsByCompany({
        companyId,
        page,
        pageSize,
        filters,
    }: SearchClientsByCompanyRequest): Promise<SearchClientsByCompanyResponse> {
        const clientCompanyRelationRepo = this.dataSource.getRepository(
            CompanyClientRelationEntity,
        );

        const clientTypeFilter =
            filters.statuses.length > 0
                ? {
                      client: {
                          type: In(filters.statuses),
                      },
                  }
                : {};

        const [relations, total] = await clientCompanyRelationRepo.findAndCount(
            {
                where: {
                    companyId,
                    ...clientTypeFilter,
                },
                relations: {
                    client: true,
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
            },
        );

        const clients = relations.map((r) => r.client);

        return {
            total,
            page,
            pageSize,
            data: clients,
        };
    }
}
