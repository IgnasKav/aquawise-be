import { IsString } from 'class-validator';
import { ImageDto } from 'src/images/models/Image.dto';

export class CompanyUpdateDto {
    image?: ImageDto;
    @IsString()
    brandColor?: string;
}
