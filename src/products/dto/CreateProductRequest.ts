import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { ImageDto } from 'src/images/dto/Image.dto';

export class CreateProductForm {
    @IsString()
    name: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;

    @ValidateNested()
    images: ImageDto[];
}
