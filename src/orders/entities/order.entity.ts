import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from '../../user/entities/user.entity';
import { CompanyEntity } from '../../companies/entities/company.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { OrderItemEntity } from './orderItem.entity';

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    status: OrderStatus;

    @ManyToOne(() => CompanyEntity)
    company: CompanyEntity;

    @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
    items: OrderItemEntity[];

    constructor(data?: Partial<OrderEntity>) {
        this.id = data?.id ?? '';
        this.status = data?.status ?? OrderStatus.Todo;
        this.company = data?.company ?? new CompanyEntity();
        this.items = data?.items;
    }
}

export enum OrderStatus {
    Todo = 'Todo',
    InProgress = 'InProgress',
    Done = 'Done',
}
