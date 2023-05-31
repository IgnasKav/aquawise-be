import { IsOptional, IsString } from 'class-validator';
export class ClientCreateDto {
    @IsString()
    id: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;
}
