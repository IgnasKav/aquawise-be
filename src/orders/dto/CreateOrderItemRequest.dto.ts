import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

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

    @IsString()
    @IsOptional()
    productId?: string;
}
