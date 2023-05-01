import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { ProductCreateDto } from './dto/productCreate.dto';
import { ProductUpdateDto } from './dto/productUpdate.dto';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getAll() {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getById(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.getProductById(id);
    }

    @Post()
    createProduct(@Body() request: ProductCreateDto) {
        return this.productsService.createProduct(request);
    }

    @Put(':id')
    updateProduct(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() request: ProductUpdateDto,
    ) {
        return this.productsService.updateProduct(id, request);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.deleteProduct(id);
    }
}
