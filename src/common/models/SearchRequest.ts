import { IsNumber, Min, Max, IsString } from 'class-validator';

export class SearchRequest {
    @IsString()
    searchText: string;

    @IsNumber()
    @Min(1)
    page: number;

    @IsNumber()
    @Min(0)
    @Max(100)
    pageSize: number;
}

export type SearchResponse<T> = {
    total: number;
    page: number;
    pageSize: number;
    data: T[];
};
