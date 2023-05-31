import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductEntity } from '../../products/entities/product.entity';

export class CreateOrderItemRequestDto {
    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    quantity: number;

    @IsNumber()
    @IsOptional()
    price: number;

    @IsOptional()
    product?: ProductEntity;
}
