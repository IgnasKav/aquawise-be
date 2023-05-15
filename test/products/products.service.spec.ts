import { ProductsService } from '../../src/products/products.service';
import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../src/products/entities/product.entity';
import { UsersService } from '../../src/user/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
    let service: ProductsService;
    let productRepositoryMock: Partial<
        Record<keyof Repository<ProductEntity>, jest.Mock>
    >;
    let usersServiceMock: Partial<Record<keyof UsersService, jest.Mock>>;

    beforeEach(async () => {
        productRepositoryMock = {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            preload: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
        };

        usersServiceMock = {
            findById: jest.fn(),
        };

        const module = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: getRepositoryToken(ProductEntity),
                    useValue: productRepositoryMock,
                },
                {
                    provide: UsersService,
                    useValue: usersServiceMock,
                },
            ],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
    });

    describe('getProductById', () => {
        it('should return a product if it exists', async () => {
            const productId = '123';
            const expectedProduct = new ProductEntity();
            expectedProduct.id = productId;

            productRepositoryMock.findOne.mockResolvedValue(expectedProduct);

            const product = await service.getProductById(productId);

            expect(product).toEqual(expectedProduct);
            expect(productRepositoryMock.findOne).toHaveBeenCalledWith({
                where: { id: productId },
                relations: { company: true },
            });
        });

        it('should throw a NotFoundException if product does not exist', async () => {
            const productId = '123';

            productRepositoryMock.findOne.mockResolvedValue(undefined);

            await expect(service.getProductById(productId)).rejects.toThrow(
                new NotFoundException(
                    `Product with id: ${productId} not found`,
                ),
            );
        });
    });
});
