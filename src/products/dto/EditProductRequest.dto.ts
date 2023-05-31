import { IsNumber, IsString } from 'class-validator';

export class EditProductRequestDto {
    image?: Express.Multer.File;
    product: EditProductForm;
}

export class EditProductForm {
    @IsString()
    name: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}
