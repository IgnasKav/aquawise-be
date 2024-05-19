import { Injectable } from '@nestjs/common';
import { DataSource, In, Like, Repository } from 'typeorm';
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
        searchText,
        filters,
    }: SearchClientsByCompanyRequest): Promise<SearchClientsByCompanyResponse> {
        const clientCompanyRelationRepo = this.dataSource.getRepository(
            CompanyClientRelationEntity,
        );

        const queryBuilder = clientCompanyRelationRepo
            .createQueryBuilder('clientCompanyRelation')
            .innerJoinAndSelect('clientCompanyRelation.client', 'client')
            .where('clientCompanyRelation.companyId = :companyId', {
                companyId,
            });

        if (filters.types.length > 0) {
            queryBuilder.andWhere('client.type IN (:...types)', {
                types: filters.types,
            });
        }

        if (searchText.trim() !== '') {
            queryBuilder.andWhere(
                'LOWER(client.name) LIKE LOWER(:searchText)',
                {
                    searchText: `%${searchText}%`,
                },
            );
        }

        queryBuilder.skip((page - 1) * pageSize).take(pageSize);

        const [relations, total] = await queryBuilder.getManyAndCount();

        const clients = relations.map((r) => r.client);

        return {
            total,
            page,
            pageSize,
            data: clients,
        };
    }
}
