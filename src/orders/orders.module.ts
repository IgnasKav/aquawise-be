import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/orderItem.entity';
import { CompaniesModule } from '../companies/companies.module';
import { CompanyEntity } from '../companies/entities/company.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, CompanyEntity]),
    ],
    exports: [OrdersService],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
