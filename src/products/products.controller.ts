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
import { CreateProductForm } from './dto/CreateProductRequest';
import { EditProductForm } from './dto/EditProductRequest';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // everyone

    @Get()
    getAll() {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getById(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.getProductById(id);
    }

    // company admin and support

    @Post()
    @Role('admin')
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
