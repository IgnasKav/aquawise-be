import { IsObject, IsUUID } from 'class-validator';
import { ClientEntity, ClientType } from 'src/clients/entities/client.entity';
import { SearchRequest, SearchResponse } from 'src/common/models/SearchRequest';

export type ClientSearchField = 'email' | 'name' | 'phone' | 'address';

export type ClientsSearchFilter = {
    searchFields?: ClientSearchField[];
    types: ClientType[];
};

export class ClientsSearchRequest extends SearchRequest {
    @IsUUID()
    companyId: string;
    @IsObject()
    filter: ClientsSearchFilter;
}

export type ClientsSearchResponse = SearchResponse<ClientEntity>;
