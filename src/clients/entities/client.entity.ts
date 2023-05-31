import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CompanyEntity } from '../../companies/entities/company.entity';

@Entity('client')
export class ClientEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @ManyToOne(() => CompanyEntity)
    company: CompanyEntity;

    constructor(data?: Partial<ClientEntity>) {
        this.id = data?.id ?? '';
        this.firstName = data?.firstName;
        this.lastName = data?.lastName;
        this.phone = data?.phone;
        this.address = data?.address;
        this.company = data?.company ?? new CompanyEntity();
    }
}
