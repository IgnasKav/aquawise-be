import { IsObject, IsString } from 'class-validator';
import {
    ClientSearchField,
    ClientsSearchFilter,
} from 'src/clients/models/GetCompanyClientsRequest';
import { UserFilterScope } from '../entities/user-filter.entity';
import { ClientType } from 'src/clients/entities/client.entity';

export type ClientsPageSearchParams = {
    page: number;
    searchText: string;
    types: ClientType[];
    searchFields: ClientSearchField[];
};

export class UserFilterSaveRequest {
    @IsString()
    scope: UserFilterScope;

    @IsObject()
    filter: ClientsSearchFilter;
}
