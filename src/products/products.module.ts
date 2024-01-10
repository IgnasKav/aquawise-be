import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from '../user/users.module';
import { ImageEntity } from '../images/entities/image.entity';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([ProductEntity]),
        TypeOrmModule.forFeature([ImageEntity]),
    ],
    exports: [ProductsService],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}
