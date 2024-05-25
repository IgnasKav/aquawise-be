import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';
import { IsString } from 'class-validator';
import { CompanyEntity } from 'src/companies/entities/company.entity';

@Entity('image')
export class ImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    imageUrl: string;

    // relations
    @Column({ nullable: true })
    productId?: string;

    @ManyToOne(() => ProductEntity, (product) => product.images, {
        nullable: true,
    })
    product?: ProductEntity;

    @Column()
    companyId: string;

    @ManyToOne(() => CompanyEntity, (company) => company.images)
    company?: CompanyEntity;
}
