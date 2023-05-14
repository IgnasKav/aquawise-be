import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from '../../companies/entities/company.entity';

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @Column()
    imageUrl: string;

    @ManyToOne(() => CompanyEntity, { nullable: false })
    @JoinColumn({ name: 'companyId' })
    company: CompanyEntity;
}
