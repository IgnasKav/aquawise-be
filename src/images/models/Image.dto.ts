import { IsFQDN, IsOptional, IsUUID } from 'class-validator';

export class ImageDto {
    @IsUUID()
    id: string;

    @IsFQDN()
    imageUrl: string;

    @IsUUID()
    @IsOptional()
    productId?: string;
}
