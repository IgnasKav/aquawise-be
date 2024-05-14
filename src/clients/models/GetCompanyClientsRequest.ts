import { IsObject, IsUUID } from 'class-validator';
import { ClientEntity, ClientType } from 'src/clients/entities/client.entity';
import { SearchRequest, SearchResponse } from 'src/common/models/SearchRequest';

class ClientSearchFilters {
    statuses: ClientType[];
}

export class SearchClientsByCompanyRequest extends SearchRequest {
    @IsUUID()
    companyId: string;
    @IsObject()
    filters: ClientSearchFilters;
}

export type SearchClientsByCompanyResponse = {
    data: ClientEntity[];
} & SearchResponse;
