import { IsUUID } from 'class-validator';
import { SearchRequest } from 'src/common/models/SearchRequest';

export class GetCompanyClientsRequest extends SearchRequest {
    @IsUUID()
    companyId: string;
}
