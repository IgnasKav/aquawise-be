import { ValidateNested } from 'class-validator';
import { ImageDto } from './Image.dto';

export class ImageDeleteRequest {
    @ValidateNested()
    images: ImageDto[];
}
