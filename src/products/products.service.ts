import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { EditProductForm } from './models/EditProductRequest';
import { UserEntity } from 'src/user/entities/user.entity';
import checkPermission from 'src/common/permission-check';
import { CreateProductForm } from './models/CreateProductRequest';
import { ProductUpdateService } from './crud/product-update.service';
import {
    ProductsSearchRequest,
    ProductsSearchResponse,
} from './models/products-search-request';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
        private productUpdateService: ProductUpdateService,
    ) {}

    async search({
        page,
        pageSize,
    }: ProductsSearchRequest): Promise<ProductsSearchResponse> {
        const queryBuilder = this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.images', 'images')
            .leftJoinAndSelect('product.company', 'company');

        queryBuilder.skip((page - 1) * pageSize).take(pageSize);

        const [products, total] = await queryBuilder.getManyAndCount();

        return {
            total,
            page,
            pageSize,
            data: products,
        };
    }

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
            createDate: new Date(),
            changeDate: new Date(),
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
}
