import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { ImageDto } from 'src/images/dto/Image.dto';
import { ImageEntity } from 'src/images/entities/image.entity';

export class CreateProductRequestDto {
    userId: string;
    product: CreateProductForm;
}

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
