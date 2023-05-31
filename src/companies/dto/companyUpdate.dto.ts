import { IsString } from 'class-validator';

export class CompanyUpdateDto {
    image?: Express.Multer.File;
    @IsString()
    brandColor?: string;
}
