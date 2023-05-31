import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OrderItemEntity } from './orderItem.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    status: OrderStatus;

    @Column()
    serialNumber: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, { nullable: true })
    responsibleUser: UserEntity;

    @ManyToOne(() => ClientEntity)
    client: ClientEntity;

    @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
    items: OrderItemEntity[];
}

export enum OrderStatus {
    Todo = 'Todo',
    InProgress = 'InProgress',
    Done = 'Done',
}
