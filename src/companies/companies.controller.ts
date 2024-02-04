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
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { CompanyCreateDto } from './dto/companyCreate.dto';
import { CompanyUpdateDto } from './dto/companyUpdate.dto';
import { ClientsService } from '../clients/clients.service';
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

    @Post('confirm/:applicationId')
    confirmApplication(
        @Param('applicationId', ParseUUIDPipe) registrationId: string,
    ) {
        return this.companiesService.confirmApplication(registrationId);
    }

    @Post('application')
    applyForCompanyAccount(@Body() request: CompanyCreateDto) {
        return this.companiesService.applyForCompanyAccount(request);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateCompany(
        @Param('id', ParseUUIDPipe) id: string,
        @UploadedFile() image: Express.Multer.File | undefined,
        @Body() body: { brandColor: string },
    ) {
        const request: CompanyUpdateDto = {
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
