import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderRequestDto } from './CreateOrderRequest.dto';

export class UpdateOrderRequestDto extends PartialType(CreateOrderRequestDto) {}
