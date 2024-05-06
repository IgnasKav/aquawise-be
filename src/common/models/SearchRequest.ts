import { IsNumber, Min, Max } from 'class-validator';

export class SearchRequest {
    @IsNumber()
    @Min(1)
    page: number;

    @IsNumber()
    @Min(0)
    @Max(100)
    pageSize: number;
}

export type SearchResponse = {
    total: number;
    page: number;
    pageSize: number;
};
