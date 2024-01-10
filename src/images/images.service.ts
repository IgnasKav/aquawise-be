import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entity';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import { ImageDeleteRequest } from './dto/ImageDeleteRequest';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(ImageEntity)
        private imageRepo: Repository<ImageEntity>,
    ) {}

    async saveImages(images: Express.Multer.File[]): Promise<ImageEntity[]> {
        const productImages: ImageEntity[] = [];

        for (const image of images) {
            image.filename = `${uuid()}.png`;
            const path = `./images/${image.filename}`;
            fs.writeFileSync(path, image.buffer);

            const productImage = this.imageRepo.create({
                imageUrl: image.filename,
            });

            productImages.push(productImage);
        }

        const res = await this.imageRepo.save(productImages);
        return res;
    }

    async deleteImages(req: ImageDeleteRequest) {
        const imageIds = req.images.map((x) => x.id);

        const deleteFromFileSystemPromises = req.images.map((image) => {
            const path = `./images/${image.imageUrl}`;
            return fs.unlink(path, (err) => {
                if (err) throw err;
            });
        });

        await Promise.all(deleteFromFileSystemPromises);
        await this.imageRepo.delete(imageIds);
    }
}
