import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from '../../companies/entities/company.entity';
import { ImageEntity } from '../../images/entities/image.entity';

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column('decimal')
    price: number;

    @Column()
    createDate: Date;

    @Column()
    changeDate: Date;

    //relations

    @OneToMany(() => ImageEntity, (image) => image.product, {
        cascade: true,
    })
    images?: ImageEntity[];

    @Column()
    companyId: string;

    @ManyToOne(() => CompanyEntity, (company) => company.products)
    company?: CompanyEntity;
}
