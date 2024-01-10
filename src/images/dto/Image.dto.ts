import { IsFQDN, IsUUID } from 'class-validator';

export class ImageDto {
    @IsUUID()
    id: string;
    @IsFQDN()
    imageUrl: string;
}
