import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductRequestDto } from './dto/CreateProductRequest';
import { UsersService } from '../user/users.service';
import { ImageEntity } from '../images/entities/image.entity';
import { EditProductForm } from './dto/EditProductRequest';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        @InjectRepository(ImageEntity)
        private productImageRepository: Repository<ImageEntity>,
        private usersService: UsersService,
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

    async createProduct(request: CreateProductRequestDto) {
        const userEntity = await this.usersService.findById(request.userId);

        if (!userEntity) {
            throw new NotFoundException(
                `User with id: ${request.userId} not found`,
            );
        }

        if (!userEntity.company) {
            throw new ForbiddenException(
                'Only users that belong to a company can create products',
            );
        }

        const newProduct = {
            ...request.product,
            company: userEntity.company,
        };

        const product = this.productRepository.create(newProduct);

        await this.productRepository.save(product);

        return product;
    }

    async updateProduct(id: string, productForm: EditProductForm) {
        const product = await this.productRepository.preload({
            id: id,
            ...productForm,
        });

        if (!product) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }

        await this.productRepository.save(product);

        return product;
    }

    async deleteProduct(id: string) {
        return this.productRepository.delete(id);
    }

    async getAllProducts() {
        const products = await this.productRepository.find({
            relations: { images: true, company: true },
        });

        return products;
    }
}
