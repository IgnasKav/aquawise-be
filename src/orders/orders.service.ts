import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity, OrderStatus } from './entities/order.entity';
import { CreateOrderRequestDto } from './dto/CreateOrderRequest.dto';
import { UpdateOrderRequestDto } from './dto/UpdateOrderRequest.dto';
import { OrderItemEntity } from './entities/orderItem.entity';
import { v4 as uuid } from 'uuid';
import { ClientEntity } from '../clients/entities/client.entity';
import { CompanyEntity } from '../companies/entities/company.entity';
import { UserEntity } from '../user/entities/user.entity';
import * as admin from 'firebase-admin';
import { messaging } from 'firebase-admin';
import MessagingDevicesResponse = messaging.MessagingDevicesResponse;

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity)
        private readonly orderItemRepository: Repository<OrderItemEntity>,
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
    ) {}

    getSerialNumber(lastOrderSerialNumber: string) {
        const parts = lastOrderSerialNumber.split('-');
        const number = parseInt(parts[1]) + 1;
        return parts[0] + '-' + number.toString();
    }

    async getOrderById(id: string) {
        const order = await this.orderRepository.findOne({
            where: { id: id },
        });

        if (!order) {
            throw new NotFoundException(`Order with id: ${id} not found`);
        }

        return order;
    }

    async getCompanyOrders(companyId: string) {
        return await this.orderRepository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.client', 'client')
            .leftJoinAndSelect('order.responsibleUser', 'responsibleUser')
            .leftJoinAndSelect('client.company', 'company')
            .leftJoinAndSelect('order.items', 'items')
            .leftJoinAndSelect('items.product', 'product')
            .where('company.id = :companyId', { companyId })
            .getMany();
    }

    async createOrder(
        companyId: string,
        clientId: string,
        request: CreateOrderRequestDto,
    ) {
        const company = await this.companyRepository.findOne({
            where: { id: companyId },
        });

        const lastOrder = await this.orderRepository.findOne({
            order: { createdAt: 'DESC' },
            where: { client: { company: { id: companyId } } },
        });

        let serialNumber = `${company.name.substring(0, 2).toUpperCase()}-1`;
        if (lastOrder != null) {
            serialNumber = this.getSerialNumber(lastOrder.serialNumber);
        }

        const itemEntities = request.items.map((data) =>
            this.orderItemRepository.create({
                id: uuid(),
                ...data,
                product: data.product,
            }),
        );

        const order = this.orderRepository.create({
            id: uuid(),
            items: itemEntities,
            serialNumber: serialNumber,
            status: OrderStatus.Todo,
            client: { id: clientId } as ClientEntity,
        });
        await this.orderRepository.save(order);
        return order;
    }

    async updateOrder(
        clientId: string,
        id: string,
        request: UpdateOrderRequestDto,
    ) {
        const order = await this.orderRepository.preload({
            id: id,
        });

        if (request.status) {
            order.status = request.status;
            if (request.status == OrderStatus.InProgress) {
                const text = `Your order ${order.serialNumber} is in progress`;
                const notificationPayload = {
                    notification: {
                        title: 'Order status changed',
                        body: text
                            ? text.length <= 100
                                ? text
                                : text.substring(0, 97) + '...'
                            : '',
                    },
                };
                await this.sendNotification(clientId, notificationPayload);
            }
        }
        if (request.responsibleUserId) {
            order.responsibleUser = {
                id: request.responsibleUserId,
            } as UserEntity;
        }
        if (!request.status && !request.responsibleUserId) {
            order.responsibleUser = null;
        }

        if (!order) {
            throw new NotFoundException(`Order with id: ${id} not found`);
        }
        return this.orderRepository.save(order);
    }

    async deleteOrder(id: string) {
        const product = await this.getOrderById(id);
        //return this.orderRepository.delete(product);
    }

    async getAllOrders(clientId: string) {
        return await this.orderRepository.find({
            where: { client: { id: clientId } },
            relations: ['items', 'items.product'],
        });
    }

    async sendNotification(
        userId: string,
        payload: { notification: { title: string; body: string } },
    ) {
        // Get the list of device tokens.
        const allTokensResponse = await admin
            .database()
            .ref(`UsersData/${userId}/notificationTokens`)
            .get();
        const tokensMap = new Map<string, boolean>(
            Object.entries(allTokensResponse.val()),
        );
        const tokens: string | any[] = [];
        tokensMap.forEach((value, key: string) => {
            tokens.push(key);
        });

        if (tokens.length > 0) {
            const response = await admin
                .messaging()
                .sendToDevice(tokens, payload);
            await this.cleanupTokens(response, tokens, userId);
        }
    }

    cleanupTokens(
        response: MessagingDevicesResponse,
        tokens: any[],
        userId: string,
    ) {
        const tokensDelete: any[] = [];
        response.results.forEach((result, index) => {
            const error = result.error;
            if (error) {
                if (
                    error.code === 'messaging/invalid-registration-token' ||
                    error.code === 'messaging/registration-token-not-registered'
                ) {
                    const deleteTask = admin
                        .database()
                        .ref(
                            `UsersData/${userId}/notificationTokens/${tokens[index]}`,
                        )
                        .remove();
                    tokensDelete.push(deleteTask);
                }
            }
        });
        return Promise.all(tokensDelete);
    }
}
