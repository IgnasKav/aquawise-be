import { IsNumber, IsUUID, Max, Min } from 'class-validator';

export class GetCompanyClientsRequest {
    @IsUUID()
    companyId: string;

    @IsNumber()
    @Min(0)
    from: number;

    @IsNumber()
    @Min(0)
    @Max(100)
    size: number;
}
