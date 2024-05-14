import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { ClientEntity } from 'src/clients/entities/client.entity';

@Entity('company-client-relation')
export class CompanyClientRelationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    companyId: string;

    @Column()
    clientId: string;

    @ManyToOne(() => CompanyEntity, (company) => company.companyToClients)
    company: CompanyEntity;

    @ManyToOne(() => ClientEntity, (client) => client.clientToCompanies)
    client: ClientEntity;

    constructor(data: Partial<CompanyClientRelationEntity>) {
        this.id = data?.id;
        this.companyId = data?.companyId;
        this.clientId = data?.clientId;
    }
}
