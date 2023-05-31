import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { CompanyEntity } from '../../companies/entities/company.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    password: string;

    @Column({
        unique: true,
        nullable: true,
    })
    userRegistrationId: string;

    @Column()
    isRegistered: boolean;

    @Column()
    role: UserRole;

    @ManyToOne(() => CompanyEntity, { nullable: true })
    company?: CompanyEntity;

    constructor(data?: Partial<UserEntity>) {
        this.id = data?.id ?? '';
        this.firstName = data?.firstName ?? '';
        this.lastName = data?.lastName ?? '';
        this.email = data?.email ?? '';
        this.phone = data?.phone ?? '';
        this.password = data?.password ?? '';
        this.userRegistrationId = data?.userRegistrationId;
        this.isRegistered = data?.isRegistered ?? false;
        this.role = data?.role ?? UserRole.User;
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

export enum UserRole {
    User = 'User',
    Admin = 'Admin',
    Support = 'Support',
}
