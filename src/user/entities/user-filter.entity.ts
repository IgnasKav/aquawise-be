import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

export type UserFilterScope = 'clients' | 'products' | 'orders';

@Entity('user-filters')
export class UserFiltersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    scope: UserFilterScope;

    @Column()
    filterJSON: string;

    @Column()
    userId: string;

    @OneToOne(() => UserEntity, (user) => user.filters)
    user: UserEntity;
}
