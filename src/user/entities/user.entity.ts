import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from '../dto/user.dto';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column({
        unique: true,
    })
    registrationId: string;

    @Column()
    isEmailConfirmed: boolean;

    @Column()
    role: UserRole;

    constructor(data?: Partial<UserEntity>) {
        this.id = data?.id ?? '';
        this.firstName = data?.firstName ?? '';
        this.lastName = data?.lastName ?? '';
        this.email = data?.email ?? '';
        this.password = data?.password ?? '';
        this.registrationId = data?.registrationId ?? '';
        this.isEmailConfirmed = data?.isEmailConfirmed ?? false;
        this.role = data?.role ?? UserRole.User;
    }

    toDto(): UserDto {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role,
        };
    }
}

export enum UserRole {
    User = 'User',
    Admin = 'Admin',
    Support = 'Support',
}
