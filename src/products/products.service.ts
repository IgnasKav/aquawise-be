import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { EditProductRequestDto } from './dto/EditProductRequest.dto';
import { CreateProductRequestDto } from './dto/CreateProductRequest.dto';
import { UsersService } from '../user/users.service';

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
            relations: { company: true },
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

        const product = this.productRepository.create({
            ...request.product,
            imageUrl: request.image.filename,
            company: userEntity.company,
        });
        await this.productRepository.save(product);
        return product;
    }

    async updateProduct(id: string, request: EditProductRequestDto) {
        const product = await this.productRepository.preload({
            id: id,
            ...request.product,
        });

        if (!product) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }
        return this.productRepository.save(product);
    }

    async deleteProduct(id: string) {
        return this.productRepository.delete(id);
    }

    async getAllProducts() {
        return await this.productRepository.find();
    }
}
