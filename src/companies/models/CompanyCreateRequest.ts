import { IsOptional, IsString, ValidateIf } from 'class-validator';
export class CompanyCreateRequest {
    @IsString()
    name: string;

    @IsString()
    code: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;

    @IsString()
    @IsOptional()
    logoUrl?: string;
}
