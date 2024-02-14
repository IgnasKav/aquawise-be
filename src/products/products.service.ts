import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { EditProductForm } from './dto/EditProductRequest';
import { UserEntity } from 'src/user/entities/user.entity';
import checkPermission from 'src/utils/permission-check';
import { CreateProductForm } from './dto/CreateProductRequest';
import { ProductUpdateService } from './crud/product-update.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        private productUpdateService: ProductUpdateService,
    ) {}

    async getProductById(id: string) {
        const product = await this.productRepository.findOne({
            where: { id: id },
            relations: { company: true, images: true },
        });

        if (!product) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }

        return product;
    }

    async createProduct(productForm: CreateProductForm, user: UserEntity) {
        const product = this.productRepository.create({
            ...productForm,
            company: user.company,
        });

        await this.productRepository.save(product);

        return product;
    }

    async updateProduct(
        id: string,
        productForm: EditProductForm,
        user: UserEntity,
    ) {
        return this.productUpdateService.updateProduct(id, productForm, user);
    }

    // user and admin should only be able to see products from their company
    // support should be able to see all products

    async deleteProduct(id: string, user: UserEntity) {
        const product = await this.productRepository.findOne({
            where: { id: id },
        });

        if (!product) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }

        checkPermission(product, user);

        return this.productRepository.delete(id);
    }

    async getAllProducts() {
        const products = await this.productRepository.find({
            relations: { images: true, company: true },
        });

        return products;
    }
}
