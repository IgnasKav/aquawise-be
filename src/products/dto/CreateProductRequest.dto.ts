import { IsNumber, IsString } from 'class-validator';

export class CreateProductRequestDto {
    userId: string;
    image: Express.Multer.File;
    product: CreateProductForm;
}

export class CreateProductForm {
    @IsString()
    name: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}
