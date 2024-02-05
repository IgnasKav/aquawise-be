import {
    Body,
    Controller,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { ImageEntity } from './entities/image.entity';
import { ImageDeleteRequest } from './dto/ImageDeleteRequest';
import { JwtAuthGuard } from 'src/auth/decorators/jwt.decorator';
import { Role } from 'src/auth/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('images')
@Role('admin')
@UseGuards(JwtAuthGuard, RoleGuard)
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
