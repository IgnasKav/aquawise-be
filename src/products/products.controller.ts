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
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
    createProduct(@Body() body: CreateProductForm, @Request() req) {
        const userId = req.userId;
        const request: CreateProductRequestDto = {
            userId: userId,
            product: body,
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
        @Body() body: { product: string },
    ) {
        // const request: EditProductRequestDto = {
        //     image: image,
        //     product: JSON.parse(body.product) as EditProductForm,
        // };
        // return this.productsService.updateProduct(id, request);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
        return this.productsService.deleteProduct(id);
    }
}
