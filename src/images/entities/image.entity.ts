import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';
import { IsString } from 'class-validator';

@Entity('image')
export class ImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    imageUrl: string;

    @ManyToOne(() => ProductEntity, (product) => product.images, {
        nullable: true, // This makes the relation optional
    })
    product: ProductEntity | null;
}
