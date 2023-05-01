import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductCreateDto } from './dto/productCreate.dto';
import { ProductUpdateDto } from './dto/productUpdate.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
    ) {}

    async getProductById(id: string) {
        const product = await this.productRepository.findOne({
            where: { id: id },
        });

        if (!product) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }

        return product;
    }

    async createProduct(request: ProductCreateDto) {
        const product = this.productRepository.create(request);
        await this.productRepository.save(product);
        return product;
    }

    async updateProduct(id: string, request: ProductUpdateDto) {
        const product = await this.productRepository.preload({
            id: id,
            ...request,
        });

        if (!product) {
            throw new NotFoundException(`Product with id: ${id} not found`);
        }
        return this.productRepository.save(product);
    }

    async deleteProduct(id: string) {
        const product = await this.getProductById(id);
        return this.productRepository.delete(product);
    }

    async getAllProducts() {
        return await this.productRepository.find();
    }
}
