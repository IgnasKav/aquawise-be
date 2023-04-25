import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('advertisement')
export class AdvertisementEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    date: Date;

    @Column()
    description: string;

    @Column()
    state: AdvertisementState;

    @Column()
    city: string;

    @Column()
    views: number;

    @Column()
    price: number;

    @Column()
    ownerId: string;

    @Column()
    categoryId: string;
}

export enum AdvertisementState {
    New = 'New',
    Approved = 'Approved',
    Rejected = 'Rejected',
}
