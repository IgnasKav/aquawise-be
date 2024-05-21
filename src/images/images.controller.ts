import {
    Body,
    Controller,
    Post,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    Request,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { ImageEntity } from './entities/image.entity';
import { ImagesDeleteRequest } from './models/ImageDeleteRequest';
import { JwtAuthGuard } from 'src/auth/decorators/jwt.decorator';
import { Role } from 'src/auth/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ImageSaveResponse } from './models/image-save-response';

@Controller('images')
@Role('admin')
@UseGuards(JwtAuthGuard, RoleGuard)
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    createProduct(
        @UploadedFiles() images: Express.Multer.File[],
        @Request() req,
    ): Promise<ImageSaveResponse> {
        return this.imagesService.saveImages(images, req.user);
    }

    @Post('delete')
    deleteImages(@Body() body: ImagesDeleteRequest, @Request() req) {
        return this.imagesService.deleteImages(body, req.user);
    }
}
