import { ValidateNested } from 'class-validator';
import { ImageDto } from './Image.dto';

export class ImagesDeleteRequest {
    @ValidateNested()
    images: ImageDto[];
}
