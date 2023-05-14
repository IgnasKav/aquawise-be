import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';
import { OrderEntity } from './order.entity';

@Entity('order-item')
export class OrderItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    quantity: number;

    @Column({ nullable: true })
    price: number;

    @ManyToOne(() => OrderEntity)
    order: OrderEntity;

    @ManyToOne(() => ProductEntity, { nullable: true })
    product?: ProductEntity;

    constructor(data?: Partial<OrderItemEntity>) {
        this.id = data?.id ?? '';
        this.description = data?.description;
        this.quantity = data?.quantity;
        this.price = data?.price;
        this.product = data?.product;
    }
}
