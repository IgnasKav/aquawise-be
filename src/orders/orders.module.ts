import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/orderItem.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity])],
    exports: [OrdersService],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
