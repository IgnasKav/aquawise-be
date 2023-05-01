import { IsNumber, IsString } from 'class-validator';
export class ProductCreateDto {
    @IsString()
    name: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;

    @IsString()
    imageUrl: string;
}
