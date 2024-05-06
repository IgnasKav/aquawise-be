import { IsUUID } from 'class-validator';
import { ClientEntity } from 'src/clients/entities/client.entity';
import { SearchRequest, SearchResponse } from 'src/common/models/SearchRequest';

export class GetCompanyClientsRequest extends SearchRequest {
    @IsUUID()
    companyId: string;
}

export type GetCompanyClientsResponse = {
    data: ClientEntity[];
} & SearchResponse;
