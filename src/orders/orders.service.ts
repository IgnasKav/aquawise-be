import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity, OrderStatus } from './entities/order.entity';
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
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
    ) {}
}
