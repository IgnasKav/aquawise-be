import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { CompanyEntity } from '../../companies/entities/company.entity';

@Entity('client')
export class ClientEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    type: ClientType;

    @ManyToMany(() => CompanyEntity, (company) => company.clients)
    companies: CompanyEntity[];

    constructor(data?: Partial<ClientEntity>) {
        this.id = data?.id ?? '';
        this.email = data?.email;
        this.name = data?.name;
        this.phone = data?.phone;
        this.address = data?.address;
        this.type = data?.type;
    }
}

type ClientType = 'person' | 'company';
