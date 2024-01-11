import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import {
    CreateProductForm,
    CreateProductRequestDto,
} from './dto/CreateProductRequest';
import { EditProductForm } from './dto/EditProductRequest';

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
    createProduct(@Body() body: CreateProductForm, @Request() req) {
        const userId = req.userId;
        const request: CreateProductRequestDto = {
            userId: userId,
            product: body,
        };

        return this.productsService.createProduct(request);
    }

    @Put(':id')
    updateProduct(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: EditProductForm,
    ) {
        return this.productsService.updateProduct(id, body);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.deleteProduct(id);
    }
}
