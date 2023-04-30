import { AdvertisementState } from '../entities/advertisement.entity';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';

export class AdvertisementCreateRequestDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(AdvertisementState)
    state: AdvertisementState;

    @IsString()
    city: string;

    @IsNumber()
    price: number;

    @IsUUID()
    categoryId: string;
}
