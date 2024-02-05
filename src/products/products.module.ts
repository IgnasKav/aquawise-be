import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ImageEntity } from '../images/entities/image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    exports: [ProductsService],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
