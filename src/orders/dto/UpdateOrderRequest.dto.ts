import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class UpdateOrderRequestDto {
    @IsString()
    @IsOptional()
    responsibleUserId;
    @IsEnum(OrderStatus)
    @IsOptional()
    status;
}
