import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CompanyClientRelationEntity } from 'src/companies/entities/company-client-relation.entity';

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
