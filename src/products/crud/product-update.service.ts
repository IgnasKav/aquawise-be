import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { In, Repository } from 'typeorm';
import { ImageEntity } from 'src/images/entities/image.entity';
import { EditProductForm } from '../models/EditProductRequest';
import { UserEntity } from 'src/user/entities/user.entity';
import checkPermission from 'src/common/permission-check';

@Injectable()
export class ProductUpdateService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        @InjectRepository(ImageEntity)
        private imageRepository: Repository<ImageEntity>,
    ) {}

    async updateProduct(
        id: string,
        productForm: EditProductForm,
        user: UserEntity,
    ) {
        const product = await this.productRepository.findOne({
            where: { id: id },
            relations: { company: true },
        });

        if (!product) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }

        checkPermission(product, user);

        const imageIds = productForm.images.map((img) => img.id);
        const images = await this.imageRepository.find({
            where: {
                id: In(imageIds),
            },
        });

        images.forEach((image) => {
            checkPermission(image, user);
        });

        product.name = productForm.name;
        product.quantity = productForm.quantity;
        product.price = productForm.price;
        product.images = images;

        await this.productRepository.save(product);

        return product;
    }
}
