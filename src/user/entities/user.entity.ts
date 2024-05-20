import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { CompanyEntity } from '../../companies/entities/company.entity';
import { UserFiltersEntity } from './user-filter.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    password?: string;

    @Column({
        unique: true,
        nullable: true,
    })
    userRegistrationId?: string;

    @Column()
    role: UserRole;

    @Column()
    companyId: string;

    @ManyToOne(() => CompanyEntity, (company) => company.users)
    company: CompanyEntity;

    @OneToOne(() => UserFiltersEntity, (filters) => filters.user, {
        nullable: true,
    })
    @JoinColumn()
    filters: UserFiltersEntity;

    constructor(data?: Partial<UserEntity>) {
        this.id = data?.id ?? '';
        this.firstName = data?.firstName ?? '';
        this.lastName = data?.lastName ?? '';
        this.email = data?.email ?? '';
        this.phone = data?.phone ?? '';
        this.password = data?.password ?? '';
        this.userRegistrationId = data?.userRegistrationId;
        this.role = data?.role ?? 'user';
        this.company = data?.company;
    }

    toDto(): UserDto {
        return {
            id: this.id,
            email: this.email,
            phone: this.phone,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role,
            company: this.company,
        };
    }
}

export type UserRole = 'user' | 'admin' | 'support';
