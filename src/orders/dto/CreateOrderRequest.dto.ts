import {
    IsArray,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { OrderStatus } from '../entities/order.entity';
import { CreateOrderItemRequestDto } from './CreateOrderItemRequest.dto';

export class CreateOrderRequestDto {
    @IsArray()
    items: CreateOrderItemRequestDto[];
}
