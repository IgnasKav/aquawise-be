import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { ProductUpdateDto } from './dto/productUpdate.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    CreateProductForm,
    CreateProductRequestDto,
} from './dto/CreateProductRequest.dto';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

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
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './dist/images',
                filename: (req, file, cb) => {
                    const fileExtension = file.originalname.split('.')[1];
                    const fileName = `${uuid()}.${fileExtension}`;
                    cb(null, fileName);
                },
            }),
        }),
    )
    createProduct(
        @UploadedFile() image: Express.Multer.File,
        @Body() body: { product: string },
    ) {
        const request: CreateProductRequestDto = {
            image: image,
            product: JSON.parse(body.product) as CreateProductForm,
        };

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
