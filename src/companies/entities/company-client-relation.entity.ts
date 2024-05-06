import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company-client-relation')
export class CompanyClientRelationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    companyId: string;

    @Column()
    clientId: string;

    constructor(data: Partial<CompanyClientRelationEntity>) {
        this.id = data?.id;
        this.companyId = data?.companyId;
        this.clientId = data?.clientId;
    }
}
