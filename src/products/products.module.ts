import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductUpdateService } from './crud/product-update.service';
import { ImageEntity } from 'src/images/entities/image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity, ImageEntity])],
    exports: [ProductsService],
    controllers: [ProductsController],
    providers: [ProductsService, ProductUpdateService],
})
export class ProductsModule {}
