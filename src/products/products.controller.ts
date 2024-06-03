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
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/decorators/jwt.decorator';
import { ProductsService } from './products.service';
import { CreateProductForm } from './models/CreateProductRequest';
import { EditProductForm } from './models/EditProductRequest';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { ProductsSearchRequest } from './models/products-search-request';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // everyone

    @Get(':id')
    getById(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.getProductById(id);
    }

    @Post('search')
    searchProducts(@Body() request: ProductsSearchRequest) {
        return this.productsService.search(request);
    }

    // company admin and support

    @Post()
    @Role(['admin', 'support'])
    @UseGuards(JwtAuthGuard, RoleGuard)
    createProduct(@Body() body: CreateProductForm, @Request() req) {
        return this.productsService.createProduct(body, req.user);
    }

    @Put(':id')
    @Role(['admin', 'support'])
    @UseGuards(JwtAuthGuard, RoleGuard)
    updateProduct(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: EditProductForm,
        @Request() req,
    ) {
        return this.productsService.updateProduct(id, body, req.user);
    }

    @Delete(':id')
    @Role(['admin', 'support'])
    @UseGuards(JwtAuthGuard, RoleGuard)
    deleteProduct(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
        return this.productsService.deleteProduct(id, req.user);
    }
}
