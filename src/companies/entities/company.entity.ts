import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { OrderEntity } from '../../orders/entities/order.entity';

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    status: CompanyStatus;

    @Column({ nullable: true })
    brandColor: string;

    @Column({ nullable: true })
    logoUrl: string;

    @Column({ nullable: true, unique: true })
    companyRegistrationId: string;

    @OneToMany(() => UserEntity, (user) => user.company)
    users: UserEntity[];

    @OneToMany(() => OrderEntity, (order) => order.company)
    orders: OrderEntity[];
}

export enum CompanyStatus {
    ApplicationPending = 'ApplicationPending',
    Confirmed = 'Confirmed',
}
