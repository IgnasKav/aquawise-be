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
import {
    CreateProductForm,
    CreateProductRequestDto,
} from './dto/CreateProductRequest';
import { EditProductForm } from './dto/EditProductRequest';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard)
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
    @Role('admin')
    @UseGuards(RoleGuard)
    createProduct(@Body() body: CreateProductForm, @Request() req) {
        const userId = req.userId;
        const request: CreateProductRequestDto = {
            userId: userId,
            product: body,
        };

        return this.productsService.createProduct(request);
    }

    @Put(':id')
    @Role(['admin', 'support'])
    @UseGuards(RoleGuard)
    updateProduct(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: EditProductForm,
        @Request() req,
    ) {
        return this.productsService.updateProduct(id, body, req.user);
    }

    @Delete(':id')
    @Role(['admin', 'support'])
    @UseGuards(RoleGuard)
    deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.deleteProduct(id);
    }
}
