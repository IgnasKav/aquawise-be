import {
    Column,
    Entity,
    JoinColumn,
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

    @Column()
    price: number;

    @OneToMany(() => ImageEntity, (image) => image.product, {
        cascade: true,
    })
    images: ImageEntity[];

    @ManyToOne(() => CompanyEntity, { nullable: true })
    company: CompanyEntity;
}
