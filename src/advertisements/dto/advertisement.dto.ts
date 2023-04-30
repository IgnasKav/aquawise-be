import { AdvertisementState } from '../entities/advertisement.entity';

export class AdvertisementDto {
    id: string;

    title: string;

    date: Date;

    description: string;

    state: AdvertisementState;

    city: string;

    views: number;

    price: number;

    ownerId: string;

    categoryId: string;
}
