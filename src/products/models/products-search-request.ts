import { IsObject } from 'class-validator';
import { SearchRequest, SearchResponse } from 'src/common/models/SearchRequest';
import { ProductEntity } from '../entities/product.entity';

export type ProductsSearchField = 'name';

export type ProductsSearchFilter = {
    searchFields?: ProductsSearchField[];
};

export class ProductsSearchRequest extends SearchRequest {
    @IsObject()
    filter: ProductsSearchFilter;
}

export type ProductsSearchResponse = SearchResponse<ProductEntity>;
