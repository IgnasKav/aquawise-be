import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ImageEntity } from 'src/images/entities/image.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ClientEntity } from 'src/clients/entities/client.entity';

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true })
    code: string;

    @Column()
    phone: string;

    @Column({ unique: true })
    email: string;

    @Column()
    status: CompanyStatus;

    @Column({ nullable: true })
    brandColor: string;

    @OneToMany(() => ImageEntity, (image) => image.company)
    images?: ImageEntity[];

    @OneToMany(() => UserEntity, (user) => user.company)
    users?: UserEntity[];

    @OneToMany(() => ProductEntity, (product) => product.company)
    products?: ProductEntity[];

    @ManyToMany(() => ClientEntity, (client) => client.companies)
    clients?: ClientEntity[];
}

export enum CompanyStatus {
    ApplicationPending = 'ApplicationPending',
    Confirmed = 'Confirmed',
}
