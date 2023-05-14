import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity, OrderStatus } from './entities/order.entity';
import { CreateOrderRequestDto } from './dto/CreateOrderRequest.dto';
import { UpdateOrderRequestDto } from './dto/UpdateOrderRequest.dto';
import { ProductEntity } from '../products/entities/product.entity';
import { OrderItemEntity } from './entities/orderItem.entity';
import { CompanyEntity } from '../companies/entities/company.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity)
        private readonly orderItemRepository: Repository<OrderItemEntity>,
    ) {}

    async getOrderById(id: string) {
        const order = await this.orderRepository.findOne({
            where: { id: id },
        });

        if (!order) {
            throw new NotFoundException(`Order with id: ${id} not found`);
        }

        return order;
    }

    async createOrder(companyId: string, request: CreateOrderRequestDto) {
        console.log('start');
        console.log(companyId);
        const itemEntities = request.items.map((data) =>
            this.orderItemRepository.create({
                id: uuid(),
                ...data,
                product: data.productId
                    ? ({ id: data.productId } as ProductEntity)
                    : null,
            }),
        );

        console.log('items entities');

        const order = this.orderRepository.create({
            id: uuid(),
            items: itemEntities,
            company: { id: companyId } as CompanyEntity,
        });
        await this.orderRepository.save(order);
        return order;
    }

    async updateOrder(id: string, request: UpdateOrderRequestDto) {
        const order = await this.orderRepository.preload({
            id: id,
            ...request,
        });

        if (!order) {
            throw new NotFoundException(`Order with id: ${id} not found`);
        }
        return this.orderRepository.save(order);
    }

    async deleteOrder(id: string) {
        const product = await this.getOrderById(id);
        //return this.orderRepository.delete(product);
    }

    async getAllOrders() {
        return await this.orderRepository.find();
    }
}
