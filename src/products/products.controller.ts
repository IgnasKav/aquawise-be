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
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    CreateProductForm,
    CreateProductRequestDto,
} from './dto/CreateProductRequest.dto';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import {
    EditProductForm,
    EditProductRequestDto,
} from './dto/EditProductRequest.dto';

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
                destination: './images',
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
        @Request() req,
    ) {
        const userId = req.userId;
        const request: CreateProductRequestDto = {
            userId: userId,
            image: image,
            product: JSON.parse(body.product) as CreateProductForm,
        };

        return this.productsService.createProduct(request);
    }

    @Put(':id')
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
    updateProduct(
        @Param('id', ParseUUIDPipe) id: string,
        @UploadedFile() image: Express.Multer.File | undefined,
        @Body() body: { product: string },
    ) {
        const request: EditProductRequestDto = {
            image: image,
            product: JSON.parse(body.product) as EditProductForm,
        };

        return this.productsService.updateProduct(id, request);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.deleteProduct(id);
    }
}
