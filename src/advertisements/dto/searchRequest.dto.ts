import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SearchRequestDto {
    @IsNumber()
    page: number;

    @IsString()
    query: string;

    @IsOptional()
    @IsUUID()
    userId?: string;

    @IsBoolean()
    onlyUnapproved: boolean;

    @IsOptional()
    @ValidateNested()
    @Type(() => CategoryFilter)
    categoryFilters?: CategoryFilter[];
}

export class CategoryFilter {
    @IsUUID()
    categoryId: string;

    @IsString()
    categoryFilter: string;
}
