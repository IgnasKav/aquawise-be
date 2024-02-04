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
import { EditProductForm } from './dto/EditProductRequest';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
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

    // user and admin should only be able to see products from their company
    // support should be able to see all products

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

        if (product.company.id !== user.company.id) {
            throw new ForbiddenException(
                'You are not allowed to update products from other companies',
            );
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
