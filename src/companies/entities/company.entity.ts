import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
    logoUrl: string;

    @Column({ nullable: true, unique: true })
    companyRegistrationId: string;
}

export enum CompanyStatus {
    ApplicationPending = 'ApplicationPending',
    Confirmed = 'Confirmed',
}
