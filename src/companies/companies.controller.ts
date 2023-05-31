import {
    Body,
    Controller,
    Delete,
    forwardRef,
    Get,
    Inject,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { CompanyCreateDto } from './dto/companyCreate.dto';
import { CompanyUpdateDto } from './dto/companyUpdate.dto';
import { ClientsService } from '../clients/clients.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import {
    EditProductForm,
    EditProductRequestDto,
} from '../products/dto/EditProductRequest.dto';
import { OrdersService } from '../orders/orders.service';

@Controller('')
export class CompaniesController {
    constructor(
        private readonly companiesService: CompaniesService,
        private readonly clientsService: ClientsService,
        private readonly ordersService: OrdersService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.companiesService.getAllCompanies();
    }

    @Get(':id')
    getById(@Param('id', ParseUUIDPipe) id: string) {
        return this.companiesService.getCompanyById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/orders')
    getCompanyOrders(@Param('id', ParseUUIDPipe) id: string) {
        return this.ordersService.getCompanyOrders(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/clients')
    getCompanyClients(@Param('id', ParseUUIDPipe) id: string) {
        return this.clientsService.getClients(id);
    }

    @Get('/application/:applicationId')
    getByApplicationId(
        @Param('applicationId', ParseUUIDPipe) applicationId: string,
    ) {
        return this.companiesService.getByRegistrationId(applicationId);
    }

    @Post('confirm/:applicationId')
    confirmApplication(
        @Param('applicationId', ParseUUIDPipe) applicationId: string,
    ) {
        return this.companiesService.confirmApplication(applicationId);
    }

    @Post()
    createCompany(@Body() request: CompanyCreateDto) {
        return this.companiesService.createCompany(request);
    }

    @UseGuards(JwtAuthGuard)
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
    updateCompany(
        @Param('id', ParseUUIDPipe) id: string,
        @UploadedFile() image: Express.Multer.File | undefined,
        @Body() body: { brandColor: string },
    ) {
        const request: CompanyUpdateDto = {
            image: image,
            brandColor: body.brandColor,
        };
        return this.companiesService.updateCompany(id, request);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteCompany(@Param('id', ParseUUIDPipe) id: string) {
        return this.companiesService.deleteCompany(id);
    }
}
