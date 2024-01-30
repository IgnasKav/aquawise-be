import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { ImageEntity } from 'src/images/entities/image.entity';

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

    @Column({ nullable: true, unique: true })
    companyRegistrationId?: string;

    @OneToMany(() => ImageEntity, (image) => image.company)
    image?: ImageEntity;

    @OneToMany(() => UserEntity, (user) => user.company)
    users?: UserEntity[];
}

export enum CompanyStatus {
    ApplicationPending = 'ApplicationPending',
    Confirmed = 'Confirmed',
}
