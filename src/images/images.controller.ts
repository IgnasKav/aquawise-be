import {
    Body,
    Controller,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { ImageEntity } from './entities/image.entity';
import { ImageDeleteRequest } from './dto/ImageDeleteRequest';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    createProduct(
        @UploadedFiles() images: Express.Multer.File[],
    ): Promise<ImageEntity[]> {
        return this.imagesService.saveImages(images);
    }

    @Post('delete')
    deleteImages(@Body() req: ImageDeleteRequest) {
        return this.imagesService.deleteImages(req);
    }
}
