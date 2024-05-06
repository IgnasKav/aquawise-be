import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entity';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import { ImagesDeleteRequest } from './dto/ImageDeleteRequest';
import { promisify } from 'util';
import checkPermission from 'src/common/permission-check';
import { UserEntity } from 'src/user/entities/user.entity';
import { ImageDto } from './dto/Image.dto';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(ImageEntity)
        private imageRepo: Repository<ImageEntity>,
    ) {}

    // find users company, if user has no company dont save
    async saveImages(
        images: Express.Multer.File[],
        user: UserEntity,
    ): Promise<ImageEntity[]> {
        const imageEntities: ImageEntity[] = [];

        for (const image of images) {
            image.filename = `${uuid()}.png`;
            const path = `./images/${image.filename}`;
            fs.writeFileSync(path, image.buffer);

            const imageEntity: ImageEntity = {
                id: uuid(),
                imageUrl: image.filename,
                companyId: user.companyId,
                company: user.company,
            };

            imageEntities.push(imageEntity);
        }

        const res = await this.imageRepo.save(imageEntities);
        return res;
    }

    async deleteImages(req: ImagesDeleteRequest, user: UserEntity) {
        for (const image of req.images) {
            await this.deleteImage(image.id, user);
        }
    }

    // allow only the user from image company to delete
    async deleteImage(imageId: string, user: UserEntity) {
        const imageEntity = await this.imageRepo.findOne({
            where: { id: imageId },
        });

        if (!imageEntity) return;

        checkPermission(imageEntity, user);

        const deleteImageFromDisk = async () => {
            const unlinkAsync = promisify(fs.unlink);
            const path = `./images/${imageEntity.imageUrl}`;
            await unlinkAsync(path);
        };

        try {
            await deleteImageFromDisk();
            await this.imageRepo.delete(imageEntity.id);
        } catch (e) {
            throw new NotFoundException(
                `Images couldn't be deleted ${e.message}`,
            );
        }
    }
}
